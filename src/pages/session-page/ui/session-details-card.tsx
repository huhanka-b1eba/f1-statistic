import { useMemo } from "react"

import { getDriverShortName } from "@entities/driver"
import type { DashboardState } from "@shared/api/generated/types.gen"
import { formatDateTime, getDateTimeAttribute } from "@shared/lib/date-format"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Separator } from "@shared/ui/separator"
import { Typography, TypographyLarge, TypographyMuted } from "@shared/ui/typography"

import { PitStopsSection } from "./pit-stops-section"
import { RaceControlSection } from "./race-control-section"

type SessionDetailsCardProps = {
    dashboard: DashboardState
}

export const SessionDetailsCard = ({ dashboard }: SessionDetailsCardProps) => {
    const driverNamesByNumber = useMemo(() => {
        return new Map(
            dashboard.drivers.map((driver) => [driver.driverNumber, getDriverShortName(driver)]),
        )
    }, [dashboard.drivers])

    const sessionStats = [
        { dateTime: undefined, label: "Location", value: dashboard.session.location ?? "-" },
        { dateTime: undefined, label: "Country", value: dashboard.session.countryName ?? "-" },
        {
            dateTime: getDateTimeAttribute(dashboard.session.dateStart),
            label: "Start",
            value: formatDateTime(dashboard.session.dateStart),
        },
        {
            dateTime: getDateTimeAttribute(dashboard.session.dateEnd),
            label: "End",
            value: formatDateTime(dashboard.session.dateEnd),
        },
    ]

    return (
        <Card className="min-h-[640px] rounded-lg">
            <CardHeader>
                <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {sessionStats.map((stat) => (
                        <div key={stat.label}>
                            <TypographyMuted className="text-xs font-medium tracking-wide uppercase">
                                {stat.label}
                            </TypographyMuted>
                            {stat.dateTime ? (
                                <Typography
                                    as="time"
                                    variant="large"
                                    dateTime={stat.dateTime}
                                    className="mt-1 block text-base"
                                >
                                    {stat.value}
                                </Typography>
                            ) : (
                                <TypographyLarge className="mt-1 text-base">
                                    {stat.value}
                                </TypographyLarge>
                            )}
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <TypographyMuted className="text-xs font-medium tracking-wide uppercase">
                            Status
                        </TypographyMuted>
                        <div className="mt-2 flex items-center justify-center">
                            <span className="text-xl leading-none font-semibold capitalize">
                                {dashboard.sessionStatus ?? "-"}
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <TypographyMuted className="text-xs font-medium tracking-wide uppercase">
                            Drivers
                        </TypographyMuted>
                        <TypographyLarge className="mt-1 text-2xl leading-none">
                            {dashboard.drivers.length}
                        </TypographyLarge>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <PitStopsSection
                        pitStops={dashboard.pitStops}
                        driverNamesByNumber={driverNamesByNumber}
                    />
                    <RaceControlSection
                        messages={dashboard.raceControl}
                        driverNamesByNumber={driverNamesByNumber}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
