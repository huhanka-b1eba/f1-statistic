export const APP_ROUTES = {
    home: "/",
    session: "/sessions/:sessionKey",
    drivers: "/drivers",
    compare: "/compare",
} as const

export const ROUTE_LABELS = {
    home: "Home",
    session: "Session",
    drivers: "Drivers",
    compare: "Compare",
} as const

export const HEADER_NAV_ITEMS = [
    { label: ROUTE_LABELS.drivers, to: APP_ROUTES.drivers },
    { label: ROUTE_LABELS.compare, to: APP_ROUTES.compare },
] as const

export const getSessionRoute = (sessionKey: number) => {
    return `/sessions/${sessionKey}`
}
