import locations from "@shared/assets/circuits/f1-locations.json"

import type { CircuitLocation } from "./types"

const circuitLocations: CircuitLocation[] = locations

const normalizeCircuitLocation = (value: string) => {
    return value.trim().toLowerCase()
}

export const getCircuitIdByLocation = (location: string) => {
    const normalizedLocation = normalizeCircuitLocation(location)

    return (
        circuitLocations.find(
            (circuit) => normalizeCircuitLocation(circuit.location) === normalizedLocation,
        )?.id ?? null
    )
}
