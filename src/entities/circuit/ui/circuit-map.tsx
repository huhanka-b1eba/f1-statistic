import { useEffect, useMemo } from "react"
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet"
import type { Feature, LineString, MultiLineString } from "geojson"
import type { PathOptions } from "leaflet"
import L from "leaflet"
import { getCircuitIdByLocation } from "../model/get-circuit-id-by-location"
import { getCircuitTrack } from "../model/get-circuit-track"

type CircuitMapProps = {
    location?: string | null
}

type CircuitGeoJson = Feature<LineString | MultiLineString>

const circuitStyle: PathOptions = {
    color: "#ff1801",
    weight: 4,
    opacity: 1,
}

const FitBounds = ({ data }: { data: CircuitGeoJson }) => {
    const map = useMap()

    useEffect(() => {
        map.invalidateSize()

        const layer = L.geoJson(data)
        const bounds = layer.getBounds()

        if (bounds.isValid()) {
            map.fitBounds(bounds, {
                padding: [32, 32],
                maxZoom: 16,
            })
        }
    }, [data, map])

    return null
}

export const CircuitMap = ({ location }: CircuitMapProps) => {
    const data = useMemo(() => {
        if (!location) {
            return null
        }

        const circuitId = getCircuitIdByLocation(location)

        if (!circuitId) {
            return null
        }

        return getCircuitTrack(circuitId)
    }, [location])

    return (
        <div className="h-full overflow-hidden rounded-md">
            <MapContainer
                center={[45, 9]}
                zoom={13}
                scrollWheelZoom
                attributionControl={false}
                className="h-full w-full"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {data && (
                    <>
                        <GeoJSON data={data} style={circuitStyle} />
                        <FitBounds data={data} />
                    </>
                )}
            </MapContainer>
        </div>
    )
}
