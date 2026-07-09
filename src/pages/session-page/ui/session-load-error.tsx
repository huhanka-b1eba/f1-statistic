import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@shared/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@shared/ui/empty"

export const SessionLoadError = () => {
    return (
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4">
            <Empty className="max-w-md rounded-2xl p-8 text-center">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <AlertTriangleIcon className="size-6" />
                    </EmptyMedia>

                    <EmptyTitle>Could not load session</EmptyTitle>

                    <EmptyDescription>
                        The session data is temporarily unavailable. Try again later.
                    </EmptyDescription>
                </EmptyHeader>

                <EmptyContent>
                    <Button asChild>
                        <Link to="/" viewTransition>
                            <ArrowLeftIcon className="size-4" />
                            Back to home
                        </Link>
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    )
}
