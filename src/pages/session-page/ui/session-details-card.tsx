import { useMemo } from "react"

import { getDriverShortName } from "@entities/driver"
import type { DashboardState } from "@shared/api/generated/types.gen"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Separator } from "@shared/ui/separator"
import { formatDateTime } from "@shared/lib/date-format"

import { PitStopsSection } from "./pit-stops-section.tsx"
import { RaceControlSection } from "./race-control-section.tsx"

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
        { label: "Location", value: dashboard.session.location ?? "-" },
        { label: "Country", value: dashboard.session.countryName ?? "-" },
        { label: "Start", value: formatDateTime(dashboard.session.dateStart) },
        { label: "End", value: formatDateTime(dashboard.session.dateEnd) },
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
                            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                {stat.label}
                            </p>
                            <p className="mt-1 text-base font-semibold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            Status
                        </p>
                        <div className="mt-2 flex items-center justify-center">
                            <span className="text-xl leading-none font-semibold capitalize">
                                {dashboard.sessionStatus ?? "-"}
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                            Drivers
                        </p>
                        <p className="mt-1 text-2xl leading-none font-semibold">
                            {dashboard.drivers.length}
                        </p>
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
