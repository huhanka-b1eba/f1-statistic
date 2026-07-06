import type { SessionListItemWithFlagImage } from "./types.ts"

const raceSessions: SessionListItemWithFlagImage[] = [
    {
        sessionKey: 9161,
        meetingKey: 1219,
        sessionName: "Bahrain Grand Prix",
        sessionType: "Race",
        circuitShortName: "Bahrain International Circuit",
        location: "Sakhir",
        year: 2024,
        dateStart: "2024-03-02T15:00:00Z",
        dateEnd: "2024-03-02T17:00:00Z",
        flagImageUrl: "https://flagcdn.com/bh.svg",
    },
    {
        sessionKey: 9165,
        meetingKey: 1220,
        sessionName: "Saudi Arabian Grand Prix",
        sessionType: "Race",
        circuitShortName: "Jeddah Corniche Circuit",
        location: "Jeddah",
        year: 2024,
        dateStart: "2024-03-09T17:00:00Z",
        dateEnd: "2024-03-09T19:00:00Z",
        flagImageUrl: "https://flagcdn.com/sa.svg",
    },
    {
        sessionKey: 9173,
        meetingKey: 1221,
        sessionName: "Australian Grand Prix",
        sessionType: "Race",
        circuitShortName: "Albert Park Grand Prix Circuit",
        location: "Melbourne",
        year: 2024,
        dateStart: "2024-03-24T04:00:00Z",
        dateEnd: "2024-03-24T06:00:00Z",
        flagImageUrl: "https://flagcdn.com/au.svg",
    },
    {
        sessionKey: 9181,
        meetingKey: 1222,
        sessionName: "Japanese Grand Prix",
        sessionType: "Race",
        circuitShortName: "Suzuka Circuit",
        location: "Suzuka",
        year: 2024,
        dateStart: "2024-04-07T05:00:00Z",
        dateEnd: "2024-04-07T07:00:00Z",
        flagImageUrl: "https://flagcdn.com/jp.svg",
    },
    {
        sessionKey: 9189,
        meetingKey: 1223,
        sessionName: "Chinese Grand Prix",
        sessionType: "Race",
        circuitShortName: "Shanghai International Circuit",
        location: "Shanghai",
        year: 2024,
        dateStart: "2024-04-21T07:00:00Z",
        dateEnd: "2024-04-21T09:00:00Z",
        flagImageUrl: "https://flagcdn.com/cn.svg",
    },
    {
        sessionKey: 9197,
        meetingKey: 1224,
        sessionName: "Miami Grand Prix",
        sessionType: "Race",
        circuitShortName: "Miami International Autodrome",
        location: "Miami",
        year: 2024,
        dateStart: "2024-05-05T20:00:00Z",
        dateEnd: "2024-05-05T22:00:00Z",
        flagImageUrl: "https://flagcdn.com/us.svg",
    },
    {
        sessionKey: 9205,
        meetingKey: 1225,
        sessionName: "Emilia Romagna Grand Prix",
        sessionType: "Race",
        circuitShortName: "Autodromo Enzo e Dino Ferrari",
        location: "Imola",
        year: 2024,
        dateStart: "2024-05-19T13:00:00Z",
        dateEnd: "2024-05-19T15:00:00Z",
        flagImageUrl: "https://flagcdn.com/it.svg",
    },
    {
        sessionKey: 9213,
        meetingKey: 1226,
        sessionName: "Monaco Grand Prix",
        sessionType: "Race",
        circuitShortName: "Circuit de Monaco",
        location: "Monaco",
        year: 2024,
        dateStart: "2024-05-26T13:00:00Z",
        dateEnd: "2024-05-26T15:00:00Z",
        flagImageUrl: "https://flagcdn.com/mc.svg",
    },
    {
        sessionKey: 9221,
        meetingKey: 1227,
        sessionName: "Canadian Grand Prix",
        sessionType: "Race",
        circuitShortName: "Circuit Gilles-Villeneuve",
        location: "Montreal",
        year: 2024,
        dateStart: "2024-06-09T18:00:00Z",
        dateEnd: "2024-06-09T20:00:00Z",
        flagImageUrl: "https://flagcdn.com/ca.svg",
    },
    {
        sessionKey: 9229,
        meetingKey: 1228,
        sessionName: "Spanish Grand Prix",
        sessionType: "Race",
        circuitShortName: "Circuit de Barcelona-Catalunya",
        location: "Barcelona",
        year: 2024,
        dateStart: "2024-06-23T13:00:00Z",
        dateEnd: "2024-06-23T15:00:00Z",
        flagImageUrl: "https://flagcdn.com/es.svg",
    },
    {
        sessionKey: 9237,
        meetingKey: 1229,
        sessionName: "Austrian Grand Prix",
        sessionType: "Race",
        circuitShortName: "Red Bull Ring",
        location: "Spielberg",
        year: 2024,
        dateStart: "2024-06-30T13:00:00Z",
        dateEnd: "2024-06-30T15:00:00Z",
        flagImageUrl: "https://flagcdn.com/at.svg",
    },
    {
        sessionKey: 9245,
        meetingKey: 1230,
        sessionName: "British Grand Prix",
        sessionType: "Race",
        circuitShortName: "Silverstone Circuit",
        location: "Silverstone",
        year: 2024,
        dateStart: "2024-07-07T14:00:00Z",
        dateEnd: "2024-07-07T16:00:00Z",
        flagImageUrl: "https://flagcdn.com/gb.svg",
    },
]

const sessionVariants = [
    { sessionType: "Practice 1", keyOffset: 1, startOffsetHours: -50, durationHours: 1 },
    { sessionType: "Practice 2", keyOffset: 2, startOffsetHours: -46, durationHours: 1 },
    { sessionType: "Qualifying", keyOffset: 3, startOffsetHours: -24, durationHours: 1 },
    { sessionType: "Race", keyOffset: 4, startOffsetHours: 0, durationHours: 2 },
] as const

const shiftIsoDate = (date: string, offsetHours: number) => {
    const timestamp = new Date(date).getTime() + offsetHours * 60 * 60 * 1000

    return new Date(timestamp).toISOString()
}

export const mockSessions: SessionListItemWithFlagImage[] = raceSessions.flatMap((meeting) =>
    sessionVariants.map((variant) => {
        const dateStart = meeting.dateStart
            ? shiftIsoDate(meeting.dateStart, variant.startOffsetHours)
            : meeting.dateStart
        const dateEnd = dateStart ? shiftIsoDate(dateStart, variant.durationHours) : meeting.dateEnd

        return {
            ...meeting,
            sessionKey: meeting.sessionKey * 10 + variant.keyOffset,
            sessionType: variant.sessionType,
            dateStart,
            dateEnd,
        }
    }),
)
