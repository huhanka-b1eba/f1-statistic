import { useState } from "react"

import { mockSessions } from "../model/mock-sessions"
import { SessionList } from "./session-list"

const HomePage = () => {
    const [sessions] = useState(mockSessions)

    return <SessionList sessions={sessions} />
}

export default HomePage
