import type { ComponentProps } from "react"

import { cn } from "@shared/lib/utils"

export const TypographyH1 = ({ className, ...props }: ComponentProps<"h1">) => {
    return (
        <h1
            className={cn("text-4xl font-extrabold tracking-tight text-balance", className)}
            {...props}
        />
    )
}

export const TypographyH2 = ({ className, ...props }: ComponentProps<"h2">) => {
    return <h2 className={cn("text-3xl font-semibold tracking-tight", className)} {...props} />
}

export const TypographyH3 = ({ className, ...props }: ComponentProps<"h3">) => {
    return <h3 className={cn("text-2xl font-semibold tracking-tight", className)} {...props} />
}

export const TypographyH4 = ({ className, ...props }: ComponentProps<"h4">) => {
    return <h4 className={cn("text-xl font-semibold tracking-tight", className)} {...props} />
}

export const TypographyP = ({ className, ...props }: ComponentProps<"p">) => {
    return <p className={cn("leading-7", className)} {...props} />
}

export const TypographyMuted = ({ className, ...props }: ComponentProps<"p">) => {
    return <p className={cn("text-muted-foreground text-sm", className)} {...props} />
}

export const TypographyLead = ({ className, ...props }: ComponentProps<"p">) => {
    return <p className={cn("text-muted-foreground text-xl", className)} {...props} />
}

export const TypographySmall = ({ className, ...props }: ComponentProps<"small">) => {
    return <small className={cn("text-sm leading-none font-medium", className)} {...props} />
}

export const TypographyLarge = ({ className, ...props }: ComponentProps<"div">) => {
    return <div className={cn("text-lg font-semibold", className)} {...props} />
}

export const TypographyBlockquote = ({ className, ...props }: ComponentProps<"blockquote">) => {
    return <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
}

export const TypographyInlineCode = ({ className, ...props }: ComponentProps<"code">) => {
    return (
        <code
            className={cn("bg-muted rounded px-1 py-0.5 font-mono text-sm", className)}
            {...props}
        />
    )
}
