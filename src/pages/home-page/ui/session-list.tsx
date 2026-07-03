import { CircuitTrackPreview } from "@entities/circuit"
import { SessionCard } from "@entities/session"
import type { SessionListItemWithFlagImage } from "../model/types"

type SessionListProps = {
    sessions: SessionListItemWithFlagImage[]
}

export const SessionList = ({ sessions }: SessionListProps) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {sessions.map((session) => (
                <SessionCard
                    key={session.sessionKey}
                    {...session}
                    trackPreview={<CircuitTrackPreview location={session.location} />}
                />
            ))}
        </div>
    )
}
