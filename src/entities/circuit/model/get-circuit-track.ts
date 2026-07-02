const trackModules = import.meta.glob("src/shared/assets/circuits/geojson/*.geojson", {
    query: "?raw",
    import: "default",
})

export const getCircuitTrack = async (circuitId: string) => {
    const trackPath = `/src/shared/assets/circuits/geojson/${circuitId}.geojson`
    const loadTrack = trackModules[trackPath]

    if (!loadTrack) {
        return null
    }

    const rawTrack = await loadTrack()

    return JSON.parse(rawTrack as string)
}
