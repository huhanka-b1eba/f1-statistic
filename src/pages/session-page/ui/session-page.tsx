import type { DashboardState } from "@shared/api/generated/types.gen"

import { SessionDetailsCard } from "./session-details-card"
import { SessionPageHeader } from "./session-page-header"
import { TrackPreviewCard } from "./track-preview-card"
import { VirtualDriversCard } from "./virtual-drivers-card"

const dashboard: DashboardState = {
    session: {
        sessionKey: 9165,
        meetingKey: 1219,
        sessionName: "Race",
        sessionType: "Race",
        dateStart: "2023-09-17T12:00:00+00:00",
        dateEnd: "2023-09-17T14:00:00+00:00",
        countryName: "Singapore",
        countryCode: "SGP",
        location: "Marina Bay",
        circuitShortName: "Singapore",
        year: 2023,
    },
    asOf: "2026-07-05T17:54:10.008Z",
    sessionStatus: "green",
    currentFlag: "green",
    drivers: [
        {
            driverNumber: 55,
            position: 1,
            interval: "Leader",
            gapToLeader: "0.000",
            currentLap: 62,
            lastLap: 97.418,
            sectors: {
                sector1: 31.145,
                sector2: 40.268,
                sector3: 26.005,
            },
            compound: "HARD",
            tyreAge: 24,
            driver: {
                sessionKey: 9165,
                meetingKey: 1219,
                driverNumber: 55,
                broadcastName: "C SAINZ",
                firstName: "Carlos",
                lastName: "Sainz",
                fullName: "Carlos Sainz",
                nameAcronym: "SAI",
                teamName: "Ferrari",
                teamColour: "E80020",
                headshotUrl: "",
            },
            latestLap: null,
            currentStint: null,
        },
        {
            driverNumber: 4,
            position: 2,
            interval: "+0.812",
            gapToLeader: "+0.812",
            currentLap: 62,
            lastLap: 97.62,
            sectors: {
                sector1: 31.221,
                sector2: 40.303,
                sector3: 26.096,
            },
            compound: "MEDIUM",
            tyreAge: 17,
            driver: {
                sessionKey: 9165,
                meetingKey: 1219,
                driverNumber: 4,
                broadcastName: "L NORRIS",
                firstName: "Lando",
                lastName: "Norris",
                fullName: "Lando Norris",
                nameAcronym: "NOR",
                teamName: "McLaren",
                teamColour: "FF8000",
                headshotUrl: "",
            },
            latestLap: null,
            currentStint: null,
        },
        {
            driverNumber: 44,
            position: 3,
            interval: "+1.269",
            gapToLeader: "+1.269",
            currentLap: 62,
            lastLap: 98.115,
            sectors: {
                sector1: 31.47,
                sector2: 40.391,
                sector3: 26.254,
            },
            compound: "MEDIUM",
            tyreAge: 18,
            driver: {
                sessionKey: 9165,
                meetingKey: 1219,
                driverNumber: 44,
                broadcastName: "L HAMILTON",
                firstName: "Lewis",
                lastName: "Hamilton",
                fullName: "Lewis Hamilton",
                nameAcronym: "HAM",
                teamName: "Mercedes",
                teamColour: "27F4D2",
                headshotUrl: "",
            },
            latestLap: null,
            currentStint: null,
        },
    ],
    pitStops: [
        {
            sessionKey: 9165,
            meetingKey: 1219,
            driverNumber: 55,
            date: "2023-09-17T12:44:12+00:00",
            lapNumber: 20,
            laneDuration: 28.4,
            stopDuration: 2.8,
        },
    ],
    raceControl: [
        {
            sessionKey: 9165,
            meetingKey: 1219,
            date: "2023-09-17T13:22:00+00:00",
            category: "Flag",
            flag: "GREEN",
            driverNumber: null,
            lapNumber: 34,
            message: "Track clear",
            scope: "Track",
            sector: null,
            qualifyingPhase: null,
        },
    ],
    dataSource: "cache",
    replay: {
        progress: 1,
        speed: 0,
        isPlaying: true,
    },
}

const SessionPage = () => {
    return (
        <div className="text-left">
            <SessionPageHeader dashboard={dashboard} />

            <div className="mt-2 grid grid-cols-[420px_1fr] gap-6">
                <SessionDetailsCard dashboard={dashboard} />

                <div className="grid grid-rows-[440px_1fr] gap-6">
                    <TrackPreviewCard session={dashboard.session} />
                    <VirtualDriversCard drivers={dashboard.drivers} />
                </div>
            </div>
        </div>
    )
}

export default SessionPage
