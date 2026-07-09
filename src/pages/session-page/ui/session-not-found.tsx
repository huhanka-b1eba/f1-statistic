import { ArrowLeftIcon, SearchXIcon } from "lucide-react"
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

type SessionNotFoundProps = {
    sessionKey?: string
}

export const SessionNotFound = ({ sessionKey }: SessionNotFoundProps) => {
    return (
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4">
            <Empty className="max-w-md rounded-2xl p-8 text-center">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <SearchXIcon className="size-6" />
                    </EmptyMedia>

                    <EmptyTitle>Session not found</EmptyTitle>

                    <EmptyDescription>
                        {sessionKey
                            ? `We couldn’t find an F1 session with key ${sessionKey}.`
                            : "The session key is missing or invalid."}
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
