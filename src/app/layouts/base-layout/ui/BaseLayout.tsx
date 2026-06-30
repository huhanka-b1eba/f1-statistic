import type { ReactNode } from "react"

import Header from "@widgets/header"
import Footer from "@widgets/footer"

type BaseLayoutProps = {
    children?: ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
    return (
        <div className="bg-background text-foreground flex min-h-svh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

export default BaseLayout
