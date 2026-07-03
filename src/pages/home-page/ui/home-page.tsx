import { useMemo, useState } from "react"

import { mockSessions } from "../model/mock-sessions"

import { SessionFilters } from "./session-filters"
import { SessionList } from "./session-list"

// import { useGetMeetingsQuery, useGetSessionsQuery } from "@shared/api/generated"

const HomePage = () => {
    const [year, setYear] = useState("2024")
    const [sessionName, setSessionName] = useState("all")
    const [search, setSearch] = useState("")

    // const yearNumber = Number(year)

    // const sessionsQuery = useGetSessionsQuery({
    //     request: {
    //         query: {
    //             year: yearNumber,
    //             sessionName: sessionName === "all" ? undefined : sessionName,
    //         },
    //     },
    // })

    // const meetingsQuery = useGetMeetingsQuery({
    //     request: {
    //         query: {
    //             year: yearNumber,
    //         },
    //     },
    // })

    // const sessions = Array.isArray(sessionsQuery.data?.data) ? sessionsQuery.data.data : []
    // const meetings = Array.isArray(meetingsQuery.data?.data) ? meetingsQuery.data.data : []

    const sessions = mockSessions.filter((session) => {
        return (
            session.year === Number(year) &&
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

    return (
        <div>
            <SessionFilters
                year={year}
                sessionName={sessionName}
                search={search}
                onYearChange={setYear}
                onSessionNameChange={setSessionName}
                onSearchChange={setSearch}
            />

            {/* {sessionsQuery.isLoading && (
                <p className="text-muted-foreground text-left">Loading...</p>
            )} */}
            {/* {sessionsQuery.isError && (
                <p className="text-destructive text-left">Failed to load sessions</p>
            )} */}
            <SessionList sessions={filteredSessions} meetingFlags={meetingFlags} />
        </div>
    )
}

export default HomePage
