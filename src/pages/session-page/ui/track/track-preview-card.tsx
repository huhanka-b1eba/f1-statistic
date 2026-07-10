import { CircuitMap, CircuitTrackPreview } from "@entities/circuit"

import type { SessionListItem } from "@shared/api/generated/types.gen"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs"
import { Typography } from "@shared/ui/typography"

type TrackPreviewCardProps = {
    session: SessionListItem
}

const trackPreviewTabs = [
    { label: "SVG", value: "svg" },
    { label: "Map", value: "map" },
] as const

export const TrackPreviewCard = ({ session }: TrackPreviewCardProps) => {
    const location = session.location ?? session.circuitShortName ?? "-"

    return (
        <Tabs defaultValue="svg" className="gap-0">
            <Card className="rounded-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Track Preview</CardTitle>
                            <Typography variant="muted" className="mt-1">
                                {session.circuitShortName ?? location}
                            </Typography>
                        </div>

                        <TabsList aria-label="Track preview type">
                            {trackPreviewTabs.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                </CardHeader>

                <CardContent className="min-h-96 pt-4">
                    <TabsContent
                        value="svg"
                        className="mt-0 flex h-72 w-full items-center justify-center rounded-md"
                    >
                        <CircuitTrackPreview location={location} />
                    </TabsContent>

                    <TabsContent value="map" className="mt-0 h-72 w-full rounded-md">
                        <CircuitMap location={location} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    )
}
