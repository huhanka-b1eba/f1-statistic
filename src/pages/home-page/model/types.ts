import type { SessionListItem } from "@shared/api/generated"

export type SessionListItemWithFlagImage = SessionListItem & {
    flagImageUrl?: string
}
