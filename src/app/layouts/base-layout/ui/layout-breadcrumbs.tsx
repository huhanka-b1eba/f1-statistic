import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@shared/ui/breadcrumb.tsx"
import { Link, useMatches } from "react-router"
import { Fragment } from "react"

type BreadcrumbHandle = {
    breadcrumb: string
}

type RouteMatch = ReturnType<typeof useMatches>[number]

type BreadcrumbMatch = RouteMatch & {
    handle: BreadcrumbHandle
}

const isBreadcrumbMatch = (match: RouteMatch): match is BreadcrumbMatch => {
    const handle = match.handle

    return (
        typeof handle === "object" &&
        handle !== null &&
        "breadcrumb" in handle &&
        typeof handle.breadcrumb === "string"
    )
}

const LayoutBreadcrumbs = () => {
    const matches = useMatches()

    const breadcrumbs = matches.filter(isBreadcrumbMatch)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((match, index) => {
                    const isLast = index === breadcrumbs.length - 1

                    return (
                        <Fragment key={match.id}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{match.handle.breadcrumb}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={match.pathname}>{match.handle.breadcrumb}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default LayoutBreadcrumbs
