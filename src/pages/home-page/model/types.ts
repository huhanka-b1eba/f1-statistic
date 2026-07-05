import type { SessionListItem } from "@entities/session"

export type SessionListItemWithFlagImage = SessionListItem & {
    flagImageUrl?: string
}
