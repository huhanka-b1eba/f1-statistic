import { createBrowserRouter } from "react-router"

import BaseLayout from "@app/layouts/base-layout"
import HomePage from "@pages/home-page"
import SessionPage from "@pages/session-page"
import { APP_ROUTES, ROUTE_LABELS } from "@shared/config/routes"
import DriverPage from "@pages/driver-page/ui/driver-page"

export const router = createBrowserRouter([
    {
        path: APP_ROUTES.home,
        Component: BaseLayout,
        handle: {
            breadcrumb: ROUTE_LABELS.home,
        },
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: APP_ROUTES.session,
                Component: SessionPage,
                handle: {
                    breadcrumb: ROUTE_LABELS.session,
                },
            },
            {
                path: APP_ROUTES.driver,
                Component: DriverPage,
                handle: {
                    breadcrumb: ROUTE_LABELS.driver,
                },
            },
        ],
    },
])
