import { useMemo, useState } from "react"

import { mockSessions } from "./mock-sessions"

// import { useGetMeetingsQuery, useGetSessionsQuery } from "@shared/api/generated";

export const useSessionFilters = () => {
    const [year, setYear] = useState("all")
    const [sessionName, setSessionName] = useState("all")
    const [search, setSearch] = useState("")

    // const yearNumber = year === "all" ? undefined : Number(year);

    // const sessionsQuery = useGetSessionsQuery({
    //     request: {
    //         query: {
    //             year: yearNumber,
    //             sessionName: sessionName === "all" ? undefined : sessionName,
    //         },
    //     },
    // });

    // const meetingsQuery = useGetMeetingsQuery({
    //     request: {
    //         query: {
    //             year: yearNumber,
    //         },
    //     },
    // });

    // const sessions = Array.isArray(sessionsQuery.data?.data) ? sessionsQuery.data.data : [];
    // const meetings = Array.isArray(meetingsQuery.data?.data) ? meetingsQuery.data.data : [];

    const sessions = mockSessions.filter((session) => {
        return (
            (year === "all" || session.year === Number(year)) &&
            (sessionName === "all" || session.sessionType === sessionName)
        )
    })

    const meetingFlags = useMemo(() => {
        return Object.fromEntries(
            mockSessions.map((session) => [session.meetingKey, session.flagImageUrl]),
        )
    }, [])

    const filteredSessions = useMemo(() => {
        const searchValue = search.trim().toLowerCase()

        if (!searchValue) {
            return sessions
        }

        return sessions.filter((session) => {
            return (
                session.sessionName.toLowerCase().includes(searchValue) ||
                session.circuitShortName?.toLowerCase().includes(searchValue) ||
                session.location?.toLowerCase().includes(searchValue)
            )
        })
    }, [sessions, search])

    return {
        year,
        sessionName,
        search,
        setYear,
        setSessionName,
        setSearch,
        filteredSessions,
        meetingFlags,
        // sessionsQuery,
    }
}
