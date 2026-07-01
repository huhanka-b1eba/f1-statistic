export const APP_ROUTES = {
    home: "/",
    races: "/races",
    drivers: "/drivers",
    compare: "/compare",
    about: "/about",
} as const

export const ROUTE_LABELS = {
    home: "Home",
    races: "Races",
    drivers: "Drivers",
    compare: "Compare",
    about: "About",
} as const

export const HEADER_NAV_ITEMS = [
    { label: ROUTE_LABELS.races, to: APP_ROUTES.races },
    { label: ROUTE_LABELS.drivers, to: APP_ROUTES.drivers },
    { label: ROUTE_LABELS.compare, to: APP_ROUTES.compare },
    { label: ROUTE_LABELS.about, to: APP_ROUTES.about },
] as const
