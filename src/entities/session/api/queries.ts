import {
    getSessions,
    type GetSessionsRequestParams,
} from "@shared/api/generated/requests/sessions/getSessions.gen"
import {
    getMeetings,
    type GetMeetingsRequestParams,
} from "@shared/api/generated/requests/sessions/getMeetings.gen"
import {
    getDashboardBySessionKey,
    type GetDashboardBySessionKeyRequestParams,
} from "@shared/api/generated/requests/sessions/getDashboardBySessionKey.gen"

import type {
    GetApiSessionsError,
    GetApiMeetingsError,
    GetApiDashboardBySessionKeyError,
} from "@shared/api/generated/types.gen"

import { createQuery } from "@shared/api/lib/create-query"

import { sessionQueryKeys } from "./query-key"

type SessionsData = Awaited<ReturnType<typeof getSessions>>
type MeetingsData = Awaited<ReturnType<typeof getMeetings>>
type DashboardData = Awaited<ReturnType<typeof getDashboardBySessionKey>>

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
    GetDashboardBySessionKeyRequestParams,
    DashboardData,
    GetApiDashboardBySessionKeyError
>({
    queryKey: (request) => sessionQueryKeys.dashboard(request.path.sessionKey),
    queryFn: getDashboardBySessionKey,
})

export const getSessionsQueryOptions = sessionsQuery.getQueryOptions
export const useGetSessionsQuery = sessionsQuery.useQuery

export const getMeetingsQueryOptions = meetingsQuery.getQueryOptions
export const useGetMeetingsQuery = meetingsQuery.useQuery

export const getDashboardBySessionKeyQueryOptions = dashboardQuery.getQueryOptions
export const useGetDashboardBySessionKeyQuery = dashboardQuery.useQuery
