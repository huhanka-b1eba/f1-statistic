import { Outlet } from "react-router"

import AppFooter from "@widgets/footer"
import AppHeader from "@widgets/header"
import LayoutBreadcrumbs from "./layout-breadcrumbs"
import AppAlert from "@widgets/alert"

const BaseLayout = () => {
    return (
        <div className="bg-background text-foreground flex min-h-svh flex-col">
            <AppHeader />

            <AppAlert />

            <main className="bg-muted/20 flex-1">
                <div className="mx-auto w-full max-w-[1280px] px-6 py-4">
                    <LayoutBreadcrumbs />
                    <div className="mt-6">
                        <Outlet />
                    </div>
                </div>
            </main>

            <AppFooter />
        </div>
    )
}

export default BaseLayout
