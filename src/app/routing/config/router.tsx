import { createBrowserRouter } from "react-router"

import BaseLayout from "@app/layouts/base-layout"
import HomePage from "@pages/home-page"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: BaseLayout,
        handle: {
            breadcrumb: "Home",
        },
        children: [
            {
                index: true,
                Component: HomePage,
            },
        ],
    },
])
