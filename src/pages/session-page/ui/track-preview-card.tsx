import { CircuitTrackPreview } from "@entities/circuit"

import type { SessionListItem } from "@shared/api/generated/types.gen"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs"

type TrackPreviewCardProps = {
    session: SessionListItem
}

export const TrackPreviewCard = ({ session }: TrackPreviewCardProps) => {
    const location = session.location ?? session.circuitShortName ?? "-"

    return (
        <Tabs defaultValue="svg" className="gap-0">
            <Card className="rounded-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Track Preview</CardTitle>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {session.circuitShortName ?? location}
                            </p>
                        </div>
                        <TabsList aria-label="Track preview type">
                            <TabsTrigger value="svg">SVG</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent
                        value="svg"
                        className="flex h-60 w-full items-center justify-center rounded-md"
                    >
                        <CircuitTrackPreview location={location} />
                    </TabsContent>
                    <TabsContent value="map" className="h-60 w-full rounded-md">
                        <div className="relative h-full w-full overflow-hidden rounded-md" />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    )
}
