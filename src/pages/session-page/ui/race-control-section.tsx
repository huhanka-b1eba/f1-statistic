import { getDriverLabel } from "@entities/driver"
import type { RaceControlMessageDto } from "@shared/api/generated/types.gen"
import { formatShortTime, getDateTimeAttribute } from "@shared/lib/date-format"
import { Typography, TypographyP } from "@shared/ui/typography"

import { ExpandableListSection } from "./expandable-list-section"

type RaceControlSectionProps = {
    messages: RaceControlMessageDto[]
    driverNamesByNumber: Map<number, string>
}

type RaceControlRowProps = {
    message: RaceControlMessageDto
    driverNamesByNumber: Map<number, string>
}

const getRaceControlMessageKey = (message: RaceControlMessageDto) => {
    return [
        message.date,
        message.category,
        message.flag,
        message.driverNumber,
        message.lapNumber,
        message.message,
    ]
        .filter((value) => value != null && value !== "")
        .join("-")
}

const RaceControlRow = ({ message, driverNamesByNumber }: RaceControlRowProps) => {
    const driverLabel = getDriverLabel(message.driverNumber, driverNamesByNumber)
    const dateTime = getDateTimeAttribute(message.date)

    return (
        <div className="text-sm leading-5">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                {dateTime ? (
                    <Typography
                        as="time"
                        variant="muted"
                        dateTime={dateTime}
                        className="font-mono text-xs"
                    >
                        {formatShortTime(message.date)}
                    </Typography>
                ) : (
                    <span className="font-mono">{formatShortTime(message.date)}</span>
                )}
                <span>{message.category}</span>
                {message.flag && <span>{message.flag}</span>}
                {driverLabel && <span className="font-mono">{driverLabel}</span>}
                {message.lapNumber && <span>lap {message.lapNumber}</span>}
            </div>
            <TypographyP className="mt-0.5 leading-5">{message.message ?? "-"}</TypographyP>
        </div>
    )
}

export const RaceControlSection = ({ messages, driverNamesByNumber }: RaceControlSectionProps) => {
    return (
        <ExpandableListSection
            title="Race control"
            items={messages}
            emptyMessage="No race control messages"
            className="rounded-md border p-3"
            listClassName="mt-3 space-y-2"
            getItemKey={getRaceControlMessageKey}
            renderItem={(message) => (
                <RaceControlRow message={message} driverNamesByNumber={driverNamesByNumber} />
            )}
        />
    )
}
