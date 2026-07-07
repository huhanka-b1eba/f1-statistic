import { useState } from "react"

import { getDriverLabel } from "@entities/driver"
import type { RaceControlMessageDto } from "@shared/api/generated/types.gen"
import { formatShortTime } from "@shared/lib/date-format"
import { Button } from "@shared/ui/button"

type RaceControlSectionProps = {
    messages: RaceControlMessageDto[]
    driverNamesByNumber: Map<number, string>
}

type RaceControlRowProps = {
    message: RaceControlMessageDto
    driverNamesByNumber: Map<number, string>
}

const DEFAULT_VISIBLE_ITEMS = 3

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

    return (
        <div className="text-sm leading-5">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                <span className="font-mono">{formatShortTime(message.date)}</span>
                <span>{message.category}</span>
                {message.flag && <span>{message.flag}</span>}
                {driverLabel && <span className="font-mono">{driverLabel}</span>}
                {message.lapNumber && <span>lap {message.lapNumber}</span>}
            </div>
            <p className="mt-0.5">{message.message ?? "-"}</p>
        </div>
    )
}

export const RaceControlSection = ({ messages, driverNamesByNumber }: RaceControlSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const visibleMessages = isExpanded ? messages : messages.slice(0, DEFAULT_VISIBLE_ITEMS)
    const hasMoreMessages = messages.length > DEFAULT_VISIBLE_ITEMS

    return (
        <div className="rounded-md border p-3">
            <div className="flex items-baseline justify-between gap-4">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Race control
                </p>
                <span className="font-mono text-lg leading-none font-semibold">
                    {messages.length}
                </span>
            </div>

            {messages.length > 0 ? (
                <>
                    <div className="mt-3 space-y-2">
                        {visibleMessages.map((message) => (
                            <RaceControlRow
                                key={getRaceControlMessageKey(message)}
                                message={message}
                                driverNamesByNumber={driverNamesByNumber}
                            />
                        ))}
                    </div>

                    {hasMoreMessages && (
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
                <p className="text-muted-foreground mt-2 text-sm">No race control messages</p>
            )}
        </div>
    )
}
