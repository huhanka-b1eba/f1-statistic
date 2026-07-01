import { MailIcon } from "lucide-react"
import { Link } from "react-router"

import { APP_ROUTES } from "@shared/config/routes"

const footerLinks = [
    {
        label: "GitHub",
        href: "https://github.com/huhanka-b1eba/f1-statistic",
        iconSrc: "./github.svg",
    },
    {
        label: "Email",
        href: "mailto:tulybaevaigiz@gmail.com",
        icon: MailIcon,
    },
]

const AppFooter = () => {
    return (
        <footer className="border-border bg-background text-foreground border-t font-sans">
            <div className="mx-auto flex max-w-[1280px] flex-row items-center justify-between gap-4 px-4 py-5">
                <Link
                    to={APP_ROUTES.home}
                    className="flex w-fit min-w-0 items-center"
                    aria-label="F1"
                >
                    <img src="/logo.svg" alt="" className="h-5 w-auto" />
                </Link>

                <p className="text-muted-foreground text-center text-sm">
                    &copy; 2026 F1 Statistic. Built by Aigiz.
                </p>

                <div className="flex items-center gap-2">
                    {footerLinks.map(({ label, href, icon: Icon, iconSrc }) => (
                        <a
                            key={href}
                            href={href}
                            className="border-border text-h hover:bg-foreground hover:text-background focus-visible:ring-ring inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all hover:shadow-sm"
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noreferrer" : undefined}
                            aria-label={label}
                        >
                            {iconSrc ? (
                                <span
                                    aria-hidden="true"
                                    className="size-4 bg-current transition-colors"
                                    style={{
                                        mask: `url(${iconSrc}) center / contain no-repeat`,
                                        WebkitMask: `url(${iconSrc}) center / contain no-repeat`,
                                    }}
                                />
                            ) : Icon ? (
                                <Icon className="size-4" />
                            ) : null}
                            <span>{label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default AppFooter
