export const sessionQueryKeys = {
    all: ["session"] as const,

    sessions: (query?: unknown) => [...sessionQueryKeys.all, "sessions", query] as const,

    meetings: (query?: unknown) => [...sessionQueryKeys.all, "meetings", query] as const,

    dashboard: (sessionKey: number) => [...sessionQueryKeys.all, "dashboard", sessionKey] as const,

    positions: (sessionKey: number) => [...sessionQueryKeys.all, "positions", sessionKey] as const,
}
