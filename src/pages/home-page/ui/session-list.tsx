import { Link } from "react-router"

import { CircuitTrackPreview } from "@entities/circuit"
import { SessionCard } from "@entities/session"

import type { SessionListItem } from "@shared/api/generated"
import { getSessionRoute } from "@shared/config/routes"

type SessionListProps = {
    search: string
    sessions: SessionListItem[]
    meetingFlags: Record<number, string | undefined>
}

export const SessionList = ({ sessions, meetingFlags, search }: SessionListProps) => {
    return (
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sessions.map((session) => (
                <Link
                    key={session.sessionKey}
                    to={getSessionRoute(session.sessionKey)}
                    className="focus-visible:ring-ring block h-full focus-visible:ring-2 focus-visible:outline-none"
                >
                    <SessionCard
                        {...session}
                        flagImageUrl={meetingFlags[session.meetingKey]}
                        trackPreview={<CircuitTrackPreview location={session.location} />}
                        highlightQuery={search}
                    />
                </Link>
            ))}
        </div>
    )
}
