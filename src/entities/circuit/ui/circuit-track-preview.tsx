import { TrackPreview } from "./track-preview"
import { getCircuitIdByLocation } from "../model/get-circuit-id-by-location"
import { getCircuitTrack } from "../model/get-circuit-track"

type CircuitTrackPreviewProps = {
    location?: string | null
}

export const CircuitTrackPreview = ({ location }: CircuitTrackPreviewProps) => {
    if (!location) {
        return null
    }

    const circuitId = getCircuitIdByLocation(location)

    if (!circuitId) {
        return null
    }

    const track = getCircuitTrack(circuitId)

    if (!track) {
        return null
    }

    return <TrackPreview track={track} />
}
