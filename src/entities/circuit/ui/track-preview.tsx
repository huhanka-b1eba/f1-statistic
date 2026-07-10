import { geoMercator, geoPath } from "d3-geo"
import type { Feature, LineString, MultiLineString } from "geojson"

type TrackFeature = Feature<LineString | MultiLineString>

type TrackPreviewProps = {
    track: TrackFeature
}

const VIEWBOX_WIDTH = 180
const VIEWBOX_HEIGHT = 120

export const TrackPreview = ({ track }: TrackPreviewProps) => {
    const projection = geoMercator().fitSize([VIEWBOX_WIDTH, VIEWBOX_HEIGHT], track)

    const pathGenerator = geoPath(projection)
    const path = pathGenerator(track)

    if (!path) {
        return null
    }

    return (
        <svg
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="text-muted-foreground h-52 w-80"
            fill="none"
            aria-hidden
        >
            <path
                d={path}
                pathLength={1}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={1}
                strokeDashoffset={1}
                className="animate-[draw-track_1800ms_ease-out_forwards]"
            />
        </svg>
    )
}
