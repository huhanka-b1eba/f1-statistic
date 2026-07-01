import { Link, NavLink } from "react-router"

const navItems = [
    { label: "Races", to: "/races" },
    { label: "Drivers", to: "/drivers" },
    { label: "Compare", to: "/compare" },
    { label: "About", to: "/about" },
]

const AppHeader = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 text-white">
            <div className="header-bg">
                <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2" aria-label="F1 Statistic">
                        <img src="/logo.svg" alt="F1" className="h-5 w-auto" />
                        <span className="text-sm font-semibold tracking-wide uppercase">
                            Statistic
                        </span>
                    </Link>

                    <nav className="hidden md:block" aria-label="Main navigation">
                        <ul className="flex items-center gap-7">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            [
                                                "text-sm transition",
                                                isActive
                                                    ? "font-medium text-white"
                                                    : "text-white/70 hover:text-white",
                                            ].join(" ")
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
