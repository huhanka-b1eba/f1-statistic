import { useParams } from "react-router"

import {
    getSessionCardViewTransitionName,
    useGetDashboardBySessionKeyQuery,
} from "@entities/session"

import type { DashboardState } from "@shared/api/generated/types.gen"

import { SessionDetailsCard } from "./session-details-card"
import { SessionLoadError } from "./session-load-error"
import { SessionNotFound } from "./session-not-found"
import { SessionPageHeader } from "./session-page-header"
import { TrackPreviewCard } from "./track-preview-card"
import { VirtualDriversCard } from "./virtual-drivers-card"
import { SessionPageSkeleton } from "@pages/session-page/ui/session-page-skeleton"

const isDashboardState = (value: unknown): value is DashboardState => {
    return (
        typeof value === "object" &&
        value !== null &&
        "session" in value &&
        "drivers" in value &&
        "pitStops" in value &&
        "raceControl" in value
    )
}

const SessionPage = () => {
    const { sessionKey } = useParams()
    const sessionKeyNumber = Number(sessionKey)
    const isInvalidSessionKey = !sessionKey || Number.isNaN(sessionKeyNumber)

    const dashboardQuery = useGetDashboardBySessionKeyQuery(
        {
            path: {
                sessionKey: sessionKeyNumber,
            },
        },
        {
            enabled: !isInvalidSessionKey,
        },
    )

    if (isInvalidSessionKey) {
        return <SessionNotFound sessionKey={sessionKey} />
    }

    if (dashboardQuery.isPending) {
        return <SessionPageSkeleton />
    }

    const dashboardData = dashboardQuery.data?.data

    if (dashboardQuery.isError || !isDashboardState(dashboardData)) {
        return <SessionLoadError />
    }

    return (
        <div
            className="text-left"
            style={{
                viewTransitionName: getSessionCardViewTransitionName(
                    dashboardData.session.sessionKey,
                ),
            }}
        >
            <SessionPageHeader dashboard={dashboardData} />

            <div className="mt-2 grid grid-cols-[420px_1fr] gap-6">
                <SessionDetailsCard dashboard={dashboardData} />

                <div className="grid grid-rows-[440px_1fr] gap-6">
                    <TrackPreviewCard session={dashboardData.session} />
                    <VirtualDriversCard drivers={dashboardData.drivers} />
                </div>
            </div>
        </div>
    )
}

export default SessionPage
