import { getDriverLabel } from "@entities/driver"
import type { PitStopDto } from "@shared/api/generated/types.gen"
import { formatShortTime, getDateTimeAttribute } from "@shared/lib/date-format"
import { Typography } from "@shared/ui/typography"

import { ExpandableListSection } from "./expandable-list-section"

type PitStopsSectionProps = {
    pitStops: PitStopDto[]
    driverNamesByNumber: Map<number, string>
}

type PitStopRowProps = {
    pitStop: PitStopDto
    driverNamesByNumber: Map<number, string>
}

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
    const dateTime = getDateTimeAttribute(pitStop.date)

    return (
        <div className="grid grid-cols-[84px_1fr_auto] items-center gap-3 rounded-sm py-1 text-sm">
            <span className="truncate font-mono font-semibold">{driverLabel}</span>
            <span className="text-muted-foreground truncate">{formatPitStopDetails(pitStop)}</span>
            {dateTime ? (
                <Typography
                    as="time"
                    variant="muted"
                    dateTime={dateTime}
                    className="font-mono text-xs"
                >
                    {formatShortTime(pitStop.date)}
                </Typography>
            ) : (
                <span className="text-muted-foreground font-mono text-xs">
                    {formatShortTime(pitStop.date)}
                </span>
            )}
        </div>
    )
}

export const PitStopsSection = ({ pitStops, driverNamesByNumber }: PitStopsSectionProps) => {
    return (
        <ExpandableListSection
            title="Pit stops"
            items={pitStops}
            emptyMessage="No pit stop data"
            className="rounded-md border p-3"
            listClassName="mt-3 space-y-1"
            getItemKey={getPitStopKey}
            renderItem={(pitStop) => (
                <PitStopRow pitStop={pitStop} driverNamesByNumber={driverNamesByNumber} />
            )}
        />
    )
}
