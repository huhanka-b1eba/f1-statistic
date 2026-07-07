import { useState } from "react"

import { getDriverLabel } from "@entities/driver"
import type { PitStopDto } from "@shared/api/generated/types.gen"
import { formatShortTime } from "@shared/lib/date-format"
import { Button } from "@shared/ui/button"

type PitStopsSectionProps = {
    pitStops: PitStopDto[]
    driverNamesByNumber: Map<number, string>
}

type PitStopRowProps = {
    pitStop: PitStopDto
    driverNamesByNumber: Map<number, string>
}

const DEFAULT_VISIBLE_ITEMS = 3

const formatPitStopDetails = (pitStop: PitStopDto) => {
    const details = [`lap ${pitStop.lapNumber ?? "-"}`]

    if (pitStop.stopDuration != null) {
        details.push(`${pitStop.stopDuration}s`)
    }

    if (pitStop.laneDuration != null) {
        details.push(`lane ${pitStop.laneDuration}s`)
    }

    return details.join(" · ")
}

const getPitStopKey = (pitStop: PitStopDto) => {
    return [
        pitStop.driverNumber,
        pitStop.date,
        pitStop.lapNumber,
        pitStop.stopDuration,
        pitStop.laneDuration,
    ]
        .filter((value) => value != null && value !== "")
        .join("-")
}

const PitStopRow = ({ pitStop, driverNamesByNumber }: PitStopRowProps) => {
    const driverLabel = getDriverLabel(pitStop.driverNumber, driverNamesByNumber)

    return (
        <div className="grid grid-cols-[84px_1fr_auto] items-center gap-3 rounded-sm py-1 text-sm">
            <span className="truncate font-mono font-semibold">{driverLabel}</span>
            <span className="text-muted-foreground truncate">{formatPitStopDetails(pitStop)}</span>
            <span className="text-muted-foreground font-mono text-xs">
                {formatShortTime(pitStop.date)}
            </span>
        </div>
    )
}

export const PitStopsSection = ({ pitStops, driverNamesByNumber }: PitStopsSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const visiblePitStops = isExpanded ? pitStops : pitStops.slice(0, DEFAULT_VISIBLE_ITEMS)
    const hasMorePitStops = pitStops.length > DEFAULT_VISIBLE_ITEMS

    return (
        <div className="rounded-md border p-3">
            <div className="flex items-baseline justify-between gap-4">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Pit stops
                </p>
                <span className="font-mono text-lg leading-none font-semibold">
                    {pitStops.length}
                </span>
            </div>

            {pitStops.length > 0 ? (
                <>
                    <div className="mt-3 space-y-1">
                        {visiblePitStops.map((pitStop) => (
                            <PitStopRow
                                key={getPitStopKey(pitStop)}
                                pitStop={pitStop}
                                driverNamesByNumber={driverNamesByNumber}
                            />
                        ))}
                    </div>

                    {hasMorePitStops && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="xs"
                            className="text-primary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/30 mt-2 px-2"
                            onClick={() => setIsExpanded((value) => !value)}
                        >
                            {isExpanded ? "Свернуть" : "Подробнее"}
                        </Button>
                    )}
                </>
            ) : (
                <p className="text-muted-foreground mt-2 text-sm">No pit stop data</p>
            )}
        </div>
    )
}
