import type { Feature, LineString, MultiLineString } from "geojson"

type TrackFeature = Feature<LineString | MultiLineString>

const trackModules = import.meta.glob("/src/shared/assets/circuits/geojson/*.geojson", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>

export const getCircuitTrack = (circuitId: string): TrackFeature | null => {
    const trackPath = `/src/shared/assets/circuits/geojson/${circuitId}.geojson`
    const rawTrack = trackModules[trackPath]

    if (!rawTrack) {
        return null
    }

    return JSON.parse(rawTrack as string)
}
