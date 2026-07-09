import { useMemo } from "react"

import type { DriverRow, PositionPointDto } from "@shared/api/generated/types.gen"
import { Badge } from "@shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Skeleton } from "@shared/ui/skeleton"
import { Typography } from "@shared/ui/typography"

import { PositionsLineChart } from "./positions-line-chart"
import {
    getChartHeight,
    getDriversByPosition,
    normalizePositionsData,
} from "../../model/positions-chart"

type PositionsChartCardProps = {
    drivers: DriverRow[]
    positions?: PositionPointDto[]
    isError?: boolean
    isLoading?: boolean
}

const ChartMessage = ({ chartHeight, children }: { chartHeight: number; children: string }) => {
    return (
        <div
            className="border-border bg-muted/20 flex items-center justify-center rounded-md border"
            style={{ height: chartHeight }}
        >
            <Typography variant="muted">{children}</Typography>
        </div>
    )
}

const ChartSkeleton = ({ chartHeight }: { chartHeight: number }) => {
    return (
        <div className="space-y-3">
            <Skeleton className="w-full" style={{ height: chartHeight }} />

            <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
            </div>
        </div>
    )
}

export const PositionsChartCard = ({
    drivers,
    positions = [],
    isError,
    isLoading,
}: PositionsChartCardProps) => {
    const chartData = useMemo(() => {
        return normalizePositionsData(positions, drivers)
    }, [positions, drivers])
    const driversByPosition = useMemo(() => {
        return getDriversByPosition(drivers)
    }, [drivers])
    const hasPositionData = chartData.data.length > 0 && chartData.series.length > 0
    const chartHeight = getChartHeight(chartData)

    return (
        <Card className="rounded-lg">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle>Position Chart</CardTitle>
                        <Typography variant="muted" className="mt-1">
                            Driver positions from start to finish
                        </Typography>
                    </div>

                    <Badge variant="secondary">{chartData.series.length} drivers</Badge>
                </div>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <ChartSkeleton chartHeight={chartHeight} />
                ) : isError ? (
                    <ChartMessage chartHeight={chartHeight}>
                        Position history is unavailable
                    </ChartMessage>
                ) : hasPositionData ? (
                    <PositionsLineChart
                        chartData={chartData}
                        chartHeight={chartHeight}
                        driversByPosition={driversByPosition}
                    />
                ) : (
                    <ChartMessage chartHeight={chartHeight}>No position history yet</ChartMessage>
                )}
            </CardContent>
        </Card>
    )
}
