import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import { PositionAxisTick } from "./position-axis-tick"
import type { NormalizedPositionsData, PositionTickDriver } from "../../model/positions-chart"

type PositionsLineChartProps = {
    chartData: NormalizedPositionsData
    chartHeight: number
    driversByPosition: Map<number, PositionTickDriver>
}

export const PositionsLineChart = ({
    chartData,
    chartHeight,
    driversByPosition,
}: PositionsLineChartProps) => {
    const lastChartPoint = chartData.data.at(-1)
    const positionTicks = Array.from({ length: chartData.maxPosition }, (_, index) => index + 1)

    return (
        <div className="w-full" style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData.data}
                    margin={{
                        top: 16,
                        right: 8,
                        left: 0,
                        bottom: 8,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

                    <XAxis
                        dataKey="time"
                        minTickGap={32}
                        stroke="var(--muted-foreground)"
                        tickLine={false}
                    />

                    <YAxis
                        reversed
                        allowDecimals={false}
                        domain={[1, chartData.maxPosition]}
                        orientation="right"
                        ticks={positionTicks}
                        interval={0}
                        width={84}
                        stroke="var(--muted-foreground)"
                        tickLine={false}
                        tick={<PositionAxisTick driversByPosition={driversByPosition} />}
                    />

                    <Tooltip
                        itemSorter={(item) =>
                            typeof item.value === "number" ? item.value : chartData.maxPosition + 1
                        }
                        cursor={{
                            stroke: "var(--border)",
                        }}
                        contentStyle={{
                            backgroundColor: "var(--background)",
                            borderColor: "var(--border)",
                            borderRadius: "var(--radius-md)",
                        }}
                    />

                    {chartData.series.map((series) => (
                        <Line
                            key={series.dataKey}
                            type="linear"
                            dataKey={series.dataKey}
                            name={series.label}
                            stroke={series.color}
                            strokeWidth={2.5}
                            strokeOpacity={0.95}
                            dot={false}
                            activeDot={{
                                r: 4,
                            }}
                            isAnimationActive={false}
                        />
                    ))}

                    {lastChartPoint &&
                        chartData.series.map((series) => {
                            const position = lastChartPoint[series.dataKey]

                            if (typeof position !== "number") {
                                return null
                            }

                            return (
                                <ReferenceDot
                                    key={`${series.dataKey}-last-position`}
                                    x={lastChartPoint.time}
                                    y={position}
                                    r={4}
                                    fill={series.color}
                                    stroke="var(--background)"
                                    strokeWidth={1.5}
                                />
                            )
                        })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
