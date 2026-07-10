import type { DriverRow } from "@shared/api/generated/types.gen"

export const getDriverTeamColor = (
    driver: DriverRow | undefined,
    fallbackColor = "var(--muted-foreground)",
) => {
    return driver?.driver?.teamColour ? `#${driver.driver.teamColour}` : fallbackColor
}
