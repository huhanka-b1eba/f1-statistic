export const APP_ROUTES = {
    home: "/",
    session: "/sessions/:sessionKey",
    drivers: "/drivers",
    driver: "/drivers/:driverKey",
    compare: "/compare",
} as const

export const ROUTE_LABELS = {
    home: "Home",
    session: "Session",
    drivers: "Drivers",
    driver: "Driver",
    compare: "Compare",
} as const

export const HEADER_NAV_ITEMS = [
    { label: ROUTE_LABELS.drivers, to: APP_ROUTES.drivers },
    { label: ROUTE_LABELS.compare, to: APP_ROUTES.compare },
] as const

export const getSessionRoute = (sessionKey: number) => {
    return `/sessions/${sessionKey}`
}

export const getDriverRoute = (driverKey: number) => {
    return `/drivers/${driverKey}`
}
