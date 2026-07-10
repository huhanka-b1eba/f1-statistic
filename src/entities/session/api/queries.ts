import {
    getSessions,
    type GetSessionsRequestParams,
} from "@shared/api/generated/requests/sessions/getSessions.gen"
import {
    getMeetings,
    type GetMeetingsRequestParams,
} from "@shared/api/generated/requests/sessions/getMeetings.gen"
import {
    getSessionBySessionKeyDashboard,
    type GetSessionBySessionKeyDashboardRequestParams,
} from "@shared/api/generated/requests/sessions/getSessionBySessionKeyDashboard.gen"
import {
    getSessionBySessionKeyPositions,
    type GetSessionBySessionKeyPositionsRequestParams,
} from "@shared/api/generated/requests/race/getSessionBySessionKeyPositions.gen"

import type {
    GetApiSessionsError,
    GetApiMeetingsError,
    GetApiSessionsBySessionKeyDashboardError,
    GetApiSessionsBySessionKeyPositionsError,
} from "@shared/api/generated/types.gen"

import { createQuery } from "@shared/api/lib/create-query"

import { sessionQueryKeys } from "./query-key"

type SessionsData = Awaited<ReturnType<typeof getSessions>>
type MeetingsData = Awaited<ReturnType<typeof getMeetings>>
type DashboardData = Awaited<ReturnType<typeof getSessionBySessionKeyDashboard>>
type PositionsData = Awaited<ReturnType<typeof getSessionBySessionKeyPositions>>

const sessionsQuery = createQuery<
    GetSessionsRequestParams | undefined,
    SessionsData,
    GetApiSessionsError
>({
    queryKey: (request) => sessionQueryKeys.sessions(request?.query),
    queryFn: getSessions,
})

const meetingsQuery = createQuery<
    GetMeetingsRequestParams | undefined,
    MeetingsData,
    GetApiMeetingsError
>({
    queryKey: (request) => sessionQueryKeys.meetings(request?.query),
    queryFn: getMeetings,
})

const dashboardQuery = createQuery<
    GetSessionBySessionKeyDashboardRequestParams,
    DashboardData,
    GetApiSessionsBySessionKeyDashboardError
>({
    queryKey: (request) => sessionQueryKeys.dashboard(request.path.sessionKey),
    queryFn: getSessionBySessionKeyDashboard,
})

const positionsQuery = createQuery<
    GetSessionBySessionKeyPositionsRequestParams,
    PositionsData,
    GetApiSessionsBySessionKeyPositionsError
>({
    queryKey: (request) => sessionQueryKeys.positions(request.path.sessionKey),
    queryFn: getSessionBySessionKeyPositions,
})

export const getSessionsQueryOptions = sessionsQuery.getQueryOptions
export const useGetSessionsQuery = sessionsQuery.useQuery

export const getMeetingsQueryOptions = meetingsQuery.getQueryOptions
export const useGetMeetingsQuery = meetingsQuery.useQuery

export const getDashboardBySessionKeyQueryOptions = dashboardQuery.getQueryOptions
export const useGetDashboardBySessionKeyQuery = dashboardQuery.useQuery

export const getPositionsBySessionKeyQueryOptions = positionsQuery.getQueryOptions
export const useGetPositionsBySessionKeyQuery = positionsQuery.useQuery
