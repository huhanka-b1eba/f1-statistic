import { CalendarDaysIcon } from "lucide-react"

import type { DashboardState } from "@shared/api/generated/types.gen"
import { Badge } from "@shared/ui/badge"
import { Typography } from "@shared/ui/typography"

type SessionPageHeaderProps = {
    dashboard: DashboardState
}

export const SessionPageHeader = ({ dashboard }: SessionPageHeaderProps) => {
    const { session } = dashboard

    return (
        <div className="flex items-end justify-between">
            <div>
                <div className="mb-3 flex items-center gap-2">
                    <Badge>{session.sessionType}</Badge>
                </div>
                <Typography variant="h1" className="text-3xl leading-tight font-semibold">
                    {session.circuitShortName} Grand Prix {session.sessionName}
                </Typography>
            </div>

            <div className="text-muted-foreground flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                    <CalendarDaysIcon className="size-4" />
                    {session.year} season
                </span>
            </div>
        </div>
    )
}
