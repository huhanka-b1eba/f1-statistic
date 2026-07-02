import { getCircuitIdByLocation } from "@entities/circuit"

import type { SessionListItem } from "@shared/api/generated"
import { Badge } from "@shared/ui/badge"

type SessionCardProps = SessionListItem & {
    flagImageUrl?: string
}

const formatSessionDateRange = (dateStart?: string | null, dateEnd?: string | null) => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
    })

    const start = dateStart ? formatter.format(new Date(dateStart)) : null
    const end = dateEnd ? formatter.format(new Date(dateEnd)) : null

    if (start && end && start !== end) {
        return `${start} - ${end}`
    }

    return start ?? end
}

const SessionCard = ({
    sessionName,
    sessionType,
    circuitShortName,
    flagImageUrl,
    dateStart,
    dateEnd,
    location,
}: SessionCardProps) => {
    const dateRange = formatSessionDateRange(dateStart, dateEnd)

    const circuitId = location ? getCircuitIdByLocation(location) : null

    console.log(circuitId)

    return (
        <article
            className="border-border bg-card text-card-foreground hover:border-destructive w-full max-w-sm rounded-sm border p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
            data-circuit-id={circuitId ?? undefined}
        >
            <div className="flex min-h-36 gap-4">
                <div className="flex min-w-0 flex-col">
                    <div className="h-12 w-12">
                        {flagImageUrl && (
                            <img
                                src={flagImageUrl}
                                alt=""
                                className="h-full w-full object-contain"
                                loading="lazy"
                            />
                        )}
                    </div>

                    <p className="text-muted-foreground text-sm leading-none font-semibold">
                        {sessionType}
                    </p>

                    <h3 className="mt-2 mb-1 truncate text-base leading-tight font-bold">
                        {sessionName}
                    </h3>

                    {circuitShortName && (
                        <p className="text-muted-foreground truncate text-sm leading-tight font-medium">
                            {circuitShortName}
                        </p>
                    )}

                    {dateRange && (
                        <p className="text-muted-foreground mt-1 text-xs leading-tight font-semibold">
                            {dateRange}
                        </p>
                    )}

                    <div className="mt-auto flex items-center gap-2 pt-3">
                        <Badge variant="secondary">{sessionType}</Badge>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default SessionCard
