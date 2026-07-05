import type { DashboardState } from "@shared/api/generated/types.gen"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Separator } from "@shared/ui/separator"

type SessionDetailsCardProps = {
    dashboard: DashboardState
}

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return "-"
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    }).format(new Date(value))
}

const getStateColorClasses = (value?: string | null) => {
    switch (value?.toLowerCase()) {
        case "green":
            return {
                dot: "bg-green-500",
                pill: "bg-green-500/10 text-green-500",
            }
        case "yellow":
            return {
                dot: "bg-yellow-500",
                pill: "bg-yellow-500/10 text-yellow-500",
            }
        case "red":
            return {
                dot: "bg-destructive",
                pill: "bg-destructive/10 text-destructive",
            }
        default:
            return {
                dot: "bg-muted-foreground",
                pill: "bg-muted text-muted-foreground",
            }
    }
}

export const SessionDetailsCard = ({ dashboard }: SessionDetailsCardProps) => {
    const { session } = dashboard
    const latestPitStop = dashboard.pitStops.at(-1)
    const latestRaceControl = dashboard.raceControl.at(-1)
    const statusColor = getStateColorClasses(dashboard.sessionStatus)

    const sessionStats = [
        { label: "Location", value: session.location ?? "-" },
        { label: "Country", value: session.countryName ?? "-" },
        { label: "Start", value: formatDateTime(session.dateStart) },
        { label: "End", value: formatDateTime(session.dateEnd) },
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

                <div>
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                    Status
                                </p>
                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <span className={`${statusColor.dot} size-2.5 rounded-full`} />
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

                        <div className="mt-6 space-y-5">
                            <div>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                        Pit stops
                                    </p>
                                    <span className="font-mono text-lg leading-none font-semibold">
                                        {dashboard.pitStops.length}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm leading-5">
                                    {latestPitStop
                                        ? `#${latestPitStop.driverNumber} on lap ${
                                              latestPitStop.lapNumber ?? "-"
                                          }, ${latestPitStop.stopDuration ?? "-"}s stop`
                                        : "No pit stop data"}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                        Race control
                                    </p>
                                    <span className="font-mono text-lg leading-none font-semibold">
                                        {dashboard.raceControl.length}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm leading-5">
                                    {latestRaceControl?.message ?? "No race control messages"}
                                </p>
                                {latestRaceControl && (
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        {latestRaceControl.category}
                                        {latestRaceControl.flag
                                            ? ` · ${latestRaceControl.flag}`
                                            : ""}
                                        {latestRaceControl.lapNumber
                                            ? ` · lap ${latestRaceControl.lapNumber}`
                                            : ""}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
