import type { DriverDto } from "@shared/api/generated/types.gen"

type DriverNameSource = {
    driverNumber: number
    driver?: DriverDto | null
}

export const getDriverShortName = (driver: DriverNameSource) => {
    return (
        driver.driver?.nameAcronym ??
        driver.driver?.broadcastName ??
        driver.driver?.fullName ??
        String(driver.driverNumber)
    )
}

export const getDriverLabel = (
    driverNumber: number | null | undefined,
    driverNamesByNumber: Map<number, string>,
) => {
    if (driverNumber == null) {
        return null
    }

    const driverName = driverNamesByNumber.get(driverNumber)

    return driverName ? `#${driverNumber} ${driverName}` : `#${driverNumber}`
}
