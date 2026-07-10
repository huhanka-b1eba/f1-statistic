import { useSessionFilters } from "../model/use-session-filters"
import { SessionFilters } from "./session-filters"
import { SessionList } from "./session-list"

const HomePage = () => {
    const {
        year,
        sessionName,
        search,
        setYear,
        setSessionName,
        setSearch,
        filteredSessions,
        meetingFlags,
    } = useSessionFilters()

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

            <SessionList sessions={filteredSessions} meetingFlags={meetingFlags} search={search} />
        </div>
    )
}

export default HomePage
