import locations from "@shared/assets/circuits/f1-locations.json"

import type { CircuitLocation } from "./types"

const circuitLocations: CircuitLocation[] = locations

const normalizeCircuitLocation = (value: string) => {
    return value.trim().toLowerCase()
}

const isCircuitLocationMatch = (circuit: CircuitLocation, location: string) => {
    const circuitLocation = normalizeCircuitLocation(circuit.location)
    const circuitName = normalizeCircuitLocation(circuit.name)

    return (
        circuitLocation === location ||
        circuitName === location ||
        circuitLocation.includes(location) ||
        circuitName.includes(location)
    )
}

export const getCircuitIdByLocation = (location: string) => {
    const normalizedLocation = normalizeCircuitLocation(location)

    return (
        circuitLocations.find((circuit) => isCircuitLocationMatch(circuit, normalizedLocation))
            ?.id ?? null
    )
}
