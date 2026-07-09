import type { DriverRow, PositionPointDto } from "@shared/api/generated/types.gen"

import { getDriverTeamColor } from "@entities/driver"

export type ChartPoint = {
    time: string
    timestamp: number
} & Record<string, string | number>

export type PositionSeries = {
    color: string
    dataKey: string
    driverNumber: number
    label: string
}

export type PositionTickDriver = {
    acronym: string
    color: string
    headshotUrl?: string | null
}

export type NormalizedPositionsData = {
    data: ChartPoint[]
    maxPosition: number
    series: PositionSeries[]
}

const EMPTY_CHART_DATA: NormalizedPositionsData = {
    data: [],
    maxPosition: 0,
    series: [],
}

const MIN_CHART_HEIGHT = 640
const POSITION_ROW_HEIGHT = 40
const TIME_BUCKET_MS = 30_000

export const getChartHeight = (chartData: NormalizedPositionsData) => {
    const hasPositionData = chartData.data.length > 0 && chartData.series.length > 0

    return hasPositionData
        ? Math.max(MIN_CHART_HEIGHT, chartData.maxPosition * POSITION_ROW_HEIGHT)
        : MIN_CHART_HEIGHT
}

export const getDriverAcronym = (driver: DriverRow | undefined, driverNumber: number) => {
    return driver?.driver?.nameAcronym ?? String(driverNumber)
}

export const getDriversByPosition = (drivers: DriverRow[]) => {
    const driversByPosition = new Map<number, PositionTickDriver>()

    for (const driver of drivers) {
        if (driver.position == null) {
            continue
        }

        driversByPosition.set(driver.position, {
            acronym: getDriverAcronym(driver, driver.driverNumber),
            color: getDriverTeamColor(driver),
            headshotUrl: driver.driver?.headshotUrl,
        })
    }

    return driversByPosition
}

const getBucketTimestamp = (date: string) => {
    const timestamp = new Date(date).getTime()

    return Math.floor(timestamp / TIME_BUCKET_MS) * TIME_BUCKET_MS
}

const getDriverLabel = (driver: DriverRow | undefined, driverNumber: number) => {
    const fullName =
        driver?.driver?.nameAcronym ?? driver?.driver?.fullName ?? driver?.driver?.broadcastName

    if (!fullName) {
        return `Driver ${driverNumber}`
    }

    const nameParts = fullName.trim().split(" ")

    if (nameParts.length < 2) {
        return fullName
    }

    const firstName = nameParts[0]
    const lastName = nameParts.at(-1)

    return `${firstName[0]}. ${lastName}`
}

const getDriverDataKey = (driverNumber: number) => {
    return `driver_${driverNumber}`
}

const getDriverByNumber = (drivers: DriverRow[]) => {
    return new Map(drivers.map((driver) => [driver.driverNumber, driver] as const))
}

const formatRaceTime = (timestamp: number, startTimestamp: number) => {
    const diffSeconds = Math.floor((timestamp - startTimestamp) / 1000)

    const hours = Math.floor(diffSeconds / 3600)
    const minutes = Math.floor((diffSeconds % 3600) / 60)
    const seconds = diffSeconds % 60

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export const normalizePositionsData = (
    positions: PositionPointDto[],
    drivers: DriverRow[],
): NormalizedPositionsData => {
    if (!positions.length) {
        return EMPTY_CHART_DATA
    }

    const driversByNumber = getDriverByNumber(drivers)
    const sortedPositions = positions.toSorted(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
    const startTimestamp = getBucketTimestamp(sortedPositions[0].date)
    const rawPointsByTimestamp = new Map<number, ChartPoint>()

    sortedPositions.forEach((item) => {
        const timestamp = getBucketTimestamp(item.date)
        const dataKey = getDriverDataKey(item.driverNumber)
        const existingPoint = rawPointsByTimestamp.get(timestamp) ?? {
            timestamp,
            time: formatRaceTime(timestamp, startTimestamp),
        }

        existingPoint[dataKey] = item.position
        rawPointsByTimestamp.set(timestamp, existingPoint)
    })

    const driverNumbers = Array.from(
        new Set(sortedPositions.map((position) => position.driverNumber)),
    )

    const series = driverNumbers
        .map((driverNumber) => {
            const driver = driversByNumber.get(driverNumber)

            return {
                color: getDriverTeamColor(driver),
                dataKey: getDriverDataKey(driverNumber),
                driverNumber,
                label: getDriverLabel(driver, driverNumber),
            }
        })
        .sort((a, b) => {
            const firstDriver = driversByNumber.get(a.driverNumber)
            const secondDriver = driversByNumber.get(b.driverNumber)
            const fallbackPosition = drivers.length + 1

            return (
                (firstDriver?.position ?? fallbackPosition) -
                (secondDriver?.position ?? fallbackPosition)
            )
        })

    // Map.values() returns an iterator, so convert it to an array for using toSorted()
    const rawData = Array.from(rawPointsByTimestamp.values()).toSorted(
        (a, b) => a.timestamp - b.timestamp,
    )
    const lastPositionsByDriver = new Map<number, number>()
    const data = rawData.map((point) => {
        const filledPoint: ChartPoint = {
            timestamp: point.timestamp,
            time: point.time,
        }

        series.forEach((item) => {
            const currentPosition = point[item.dataKey]

            if (typeof currentPosition === "number") {
                lastPositionsByDriver.set(item.driverNumber, currentPosition)
            }

            const lastPosition = lastPositionsByDriver.get(item.driverNumber)

            if (lastPosition != null) {
                filledPoint[item.dataKey] = lastPosition
            }
        })

        return filledPoint
    })
    const maxPosition = Math.max(...sortedPositions.map((position) => position.position))

    return {
        data,
        maxPosition,
        series,
    }
}
