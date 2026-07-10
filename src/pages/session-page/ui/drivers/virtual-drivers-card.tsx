import type { ReactNode } from "react"
import { Link } from "react-router"
import { Virtuoso } from "react-virtuoso"

import { getDriverTeamColor } from "@entities/driver"
import type { DriverRow } from "@shared/api/generated/types.gen"
import { getDriverRoute } from "@shared/config/routes"
import { Badge } from "@shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Typography } from "@shared/ui/typography"

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
            <Typography
                variant="muted"
                className="text-xs leading-none font-medium tracking-wide uppercase"
            >
                {label}
            </Typography>
            <Typography
                variant="large"
                className="mt-2 truncate font-mono leading-none whitespace-nowrap"
            >
                {children}
            </Typography>
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
                        <Typography variant="muted" className="mt-1">
                            Position, lap, sectors and tyre state
                        </Typography>
                    </div>

                    <Badge variant="secondary">{drivers.length} drivers</Badge>
                </div>
            </CardHeader>

            <CardContent>
                <Virtuoso
                    style={{ height: 520 }}
                    data={drivers}
                    itemContent={(_, driver) => {
                        const teamColor = getDriverTeamColor(driver, "var(--border)")
                        const hasHeadshot = Boolean(driver.driver?.headshotUrl)
                        const avatarClassName = hasHeadshot
                            ? "flex size-24 items-end justify-center overflow-hidden rounded-md"
                            : "bg-muted/60 border-border flex size-24 items-end justify-center overflow-hidden rounded-md border"

                        return (
                            <div className="pb-3">
                                <Link
                                    to={getDriverRoute(driver.driverNumber)}
                                    className="bg-card hover:bg-muted/30 block cursor-pointer overflow-hidden rounded-lg border border-l-4 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                                    style={{
                                        borderLeftColor: teamColor,
                                    }}
                                >
                                    <div className="grid grid-cols-[96px_minmax(320px,1fr)_380px] items-center gap-6">
                                        <div className={avatarClassName}>
                                            {hasHeadshot ? (
                                                <img
                                                    src={driver.driver?.headshotUrl ?? ""}
                                                    alt={`${getDriverName(driver)}'s headshot`}
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
                                                        driver.position != null &&
                                                        driver.position <= 3
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

                                            <Typography
                                                variant="h3"
                                                className="mt-2 truncate text-lg leading-tight"
                                            >
                                                {getDriverName(driver)}
                                            </Typography>

                                            <Typography
                                                variant="muted"
                                                className="mt-1 truncate font-mono"
                                            >
                                                Gap: {formatGap(driver.gapToLeader)}
                                            </Typography>
                                        </div>

                                        <div className="grid grid-cols-[120px_minmax(220px,1fr)] gap-x-6 gap-y-4">
                                            <StatItem label="Lap">
                                                {driver.currentLap ?? "-"}
                                            </StatItem>

                                            <StatItem label="Last lap">
                                                {formatSeconds(driver.lastLap)}
                                            </StatItem>

                                            <StatItem label="Tyre">
                                                <Typography variant="p" className="leading-none">
                                                    {driver.compound ?? "-"}
                                                </Typography>
                                                <Typography
                                                    variant="p"
                                                    className="text-muted-foreground text-base leading-none"
                                                >
                                                    {driver.tyreAge != null
                                                        ? `${driver.tyreAge} laps`
                                                        : "-"}
                                                </Typography>
                                            </StatItem>

                                            <div className="min-w-0">
                                                <Typography
                                                    variant="muted"
                                                    className="text-xs leading-none font-medium tracking-wide uppercase"
                                                >
                                                    Sectors
                                                </Typography>

                                                <div className="mt-2 min-w-0 space-y-1 overflow-hidden font-mono text-lg leading-none font-semibold">
                                                    <Typography
                                                        variant="p"
                                                        className="leading-none"
                                                    >
                                                        {formatSeconds(driver.sectors.sector1)}
                                                    </Typography>
                                                    <Typography
                                                        variant="p"
                                                        className="leading-none"
                                                    >
                                                        {formatSeconds(driver.sectors.sector2)}
                                                    </Typography>
                                                    <Typography
                                                        variant="p"
                                                        className="leading-none"
                                                    >
                                                        {formatSeconds(driver.sectors.sector3)}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }}
                />
            </CardContent>
        </Card>
    )
}
