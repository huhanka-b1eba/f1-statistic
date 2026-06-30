import { MoonIcon, SunIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router"

const navItems = [
    { label: "Races", to: "/races" },
    { label: "Drivers", to: "/drivers" },
    { label: "Compare", to: "/compare" },
    { label: "About", to: "/about" },
]

const Header = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const shouldUseDark = savedTheme === "dark"

        setIsDark(shouldUseDark)
        document.documentElement.classList.toggle("dark", shouldUseDark)
    }, [])

    const toggleTheme = () => {
        const nextTheme = !isDark

        setIsDark(nextTheme)
        document.documentElement.classList.toggle("dark", nextTheme)
        localStorage.setItem("theme", nextTheme ? "dark" : "light")
    }

    return (
        <header className="border-border bg-background/90 text-foreground sticky top-0 z-50 border-b font-sans backdrop-blur">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2" aria-label="F1 Statistic">
                    <img src="/logo.png" alt="F1" className="h-5 w-auto" />
                    <span className="text-sm font-semibold tracking-wide uppercase">Statistic</span>
                </Link>

                <nav className="hidden md:block" aria-label="Main navigation">
                    <ul className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        [
                                            "text-sm transition",
                                            isActive
                                                ? "text-foreground font-medium"
                                                : "text-muted-foreground hover:text-foreground",
                                        ].join(" ")
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="border-border text-muted-foreground hover:bg-muted hover:text-foreground grid size-9 place-items-center rounded-lg border transition"
                    aria-label="Toggle theme"
                >
                    {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
                </button>
            </div>
        </header>
    )
}

export default Header
