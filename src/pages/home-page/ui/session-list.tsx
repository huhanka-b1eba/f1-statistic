import { Link } from "react-router"
import { VirtuosoGrid } from "react-virtuoso"

import { CircuitTrackPreview } from "@entities/circuit"
import { SessionCard } from "@entities/session"
import type { SessionListItem } from "@entities/session"

import { getSessionRoute } from "@shared/config/routes"

type SessionListProps = {
    search: string
    sessions: SessionListItem[]
    meetingFlags: Record<number, string | undefined>
}

export const SessionList = ({ sessions, meetingFlags, search }: SessionListProps) => {
    if (sessions.length === 0) {
        return <p className="text-muted-foreground text-left">Sessions not found</p>
    }

    return (
        <VirtuosoGrid
            useWindowScroll
            data={sessions}
            computeItemKey={(_, session) => session.sessionKey}
            listClassName="flex flex-wrap"
            itemClassName="box-border flex w-full p-2 md:w-1/2 xl:w-1/3"
            itemContent={(_, session) => (
                <Link
                    to={getSessionRoute(session.sessionKey)}
                    className="focus-visible:ring-ring block h-full w-full focus-visible:ring-2 focus-visible:outline-none"
                >
                    <SessionCard
                        {...session}
                        flagImageUrl={meetingFlags[session.meetingKey]}
                        trackPreview={<CircuitTrackPreview location={session.location} />}
                        highlightQuery={search}
                    />
                </Link>
            )}
        />
    )
}
