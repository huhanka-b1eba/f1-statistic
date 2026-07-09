import { Link, NavLink } from "react-router"

import { APP_ROUTES, HEADER_NAV_ITEMS } from "@shared/config/routes"
import { cn } from "@shared/lib/utils"

const AppHeader = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 text-white">
            <div className="bg-header-background bg-header-pattern">
                <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4">
                    <Link
                        to={APP_ROUTES.home}
                        viewTransition
                        className="flex items-center gap-2"
                        aria-label="F1 Statistic"
                    >
                        <img src="/logo.svg" alt="F1" className="h-5 w-auto" />
                        <span className="text-sm font-semibold tracking-wide uppercase">
                            Statistic
                        </span>
                    </Link>

                    <nav className="hidden md:block" aria-label="Main navigation">
                        <ul className="flex items-center gap-7">
                            {HEADER_NAV_ITEMS.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        viewTransition
                                        className={({ isActive }) =>
                                            cn(
                                                "text-sm transition",
                                                isActive
                                                    ? "font-medium text-white"
                                                    : "text-white/70 hover:text-white",
                                            )
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
