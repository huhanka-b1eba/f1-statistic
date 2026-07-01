import { createBrowserRouter } from "react-router"

import BaseLayout from "@app/layouts/base-layout"
import HomePage from "@pages/home-page"
import { APP_ROUTES, ROUTE_LABELS } from "@shared/config/routes"

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
        ],
    },
])
