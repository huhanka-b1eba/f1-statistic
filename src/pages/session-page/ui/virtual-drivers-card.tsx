import type { ReactNode } from "react"

import type { DriverRow } from "@shared/api/generated/types.gen"
import { Badge } from "@shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

type VirtualDriversCardProps = {
    drivers: DriverRow[]
}

type StatItemProps = {
    label: string
    children: ReactNode
}

const formatSeconds = (value: number | null | undefined) => {
    if (value == null) {
        return "-"
    }

    return value.toFixed(3)
}

const formatGap = (value: DriverRow["gapToLeader"]) => {
    if (Array.isArray(value)) {
        return value.filter(Boolean).join(" ") || "-"
    }

    if (value == null || value === "") {
        return "-"
    }

    return String(value)
}

const getTeamColor = (driver: DriverRow) => {
    return driver.driver?.teamColour ? `#${driver.driver.teamColour}` : "var(--border)"
}

const getDriverName = (driver: DriverRow) => {
    return (
        driver.driver?.fullName ?? driver.driver?.broadcastName ?? `Driver ${driver.driverNumber}`
    )
}

const getDriverInitials = (driver: DriverRow) => {
    return driver.driver?.nameAcronym ?? String(driver.driverNumber)
}

const StatItem = ({ label, children }: StatItemProps) => {
    return (
        <div className="min-w-0">
            <p className="text-muted-foreground text-xs leading-none font-medium tracking-wide uppercase">
                {label}
            </p>
            <div className="mt-2 truncate font-mono text-lg leading-none font-semibold whitespace-nowrap">
                {children}
            </div>
        </div>
    )
}

export const VirtualDriversCard = ({ drivers }: VirtualDriversCardProps) => {
    return (
        <Card className="rounded-lg">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle>Drivers</CardTitle>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Position, lap, sectors and tyre state
                        </p>
                    </div>

                    <Badge variant="secondary">{drivers.length} drivers</Badge>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    {drivers.map((driver) => {
                        const teamColor = getTeamColor(driver)

                        return (
                            <article
                                key={driver.driverNumber}
                                className="bg-card hover:bg-muted/30 overflow-hidden rounded-lg border border-l-4 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                                style={{
                                    borderLeftColor: teamColor,
                                }}
                            >
                                <div className="grid gap-6 xl:grid-cols-[72px_minmax(320px,1fr)_380px] xl:items-center">
                                    <div className="bg-muted/60 border-border flex size-18 items-end justify-center overflow-hidden rounded-md border">
                                        {driver.driver?.headshotUrl ? (
                                            <img
                                                src={driver.driver.headshotUrl}
                                                alt=""
                                                className="h-full w-full object-cover object-top"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className="text-muted-foreground pb-3 text-lg font-semibold">
                                                {getDriverInitials(driver)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge
                                                variant={
                                                    driver.position != null && driver.position <= 3
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="font-mono"
                                            >
                                                P{driver.position ?? "-"}
                                            </Badge>

                                            <span className="text-muted-foreground font-mono text-sm">
                                                #{driver.driverNumber}
                                            </span>

                                            {driver.driver?.teamName && (
                                                <Badge
                                                    variant="secondary"
                                                    className="max-w-48 truncate"
                                                >
                                                    {driver.driver.teamName}
                                                </Badge>
                                            )}
                                        </div>

                                        <h3 className="mt-2 truncate text-lg leading-tight font-semibold">
                                            {getDriverName(driver)}
                                        </h3>

                                        <p className="text-muted-foreground mt-1 truncate font-mono text-sm">
                                            Gap: {formatGap(driver.gapToLeader)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-[120px_minmax(220px,1fr)] gap-x-6 gap-y-4">
                                        <StatItem label="Lap">{driver.currentLap ?? "-"}</StatItem>

                                        <StatItem label="Last lap">
                                            {formatSeconds(driver.lastLap)}
                                        </StatItem>

                                        <StatItem label="Tyre">
                                            <span className="block">{driver.compound ?? "-"}</span>
                                            <span className="text-muted-foreground block text-base">
                                                {driver.tyreAge != null
                                                    ? `${driver.tyreAge} laps`
                                                    : "-"}
                                            </span>
                                        </StatItem>

                                        <div className="min-w-0">
                                            <p className="text-muted-foreground text-xs leading-none font-medium tracking-wide uppercase">
                                                Sectors
                                            </p>

                                            <div className="mt-2 min-w-0 space-y-1 overflow-hidden font-mono text-lg leading-none font-semibold">
                                                <span className="block">
                                                    {formatSeconds(driver.sectors.sector1)}
                                                </span>
                                                <span className="block">
                                                    {formatSeconds(driver.sectors.sector2)}
                                                </span>
                                                <span className="block">
                                                    {formatSeconds(driver.sectors.sector3)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
