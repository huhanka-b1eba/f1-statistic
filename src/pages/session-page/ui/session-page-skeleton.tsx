import { Skeleton } from "@shared/ui/skeleton.tsx"

export const SessionPageSkeleton = () => {
    return (
        <div className="text-left">
            <div className="mt-2 grid grid-cols-[420px_1fr] gap-6">
                <Skeleton className="h-[890px] rounded-lg" />

                <div className="grid grid-rows-[440px_1fr] gap-6">
                    <Skeleton className="rounded-lg" />
                    <Skeleton className="h-[420px] rounded-lg" />
                </div>
            </div>
        </div>
    )
}
