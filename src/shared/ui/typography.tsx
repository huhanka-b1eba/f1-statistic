import type { ComponentProps, ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

import { cn } from "@shared/lib/utils"

const typographyVariants = {
    h1: "text-4xl font-extrabold tracking-tight text-balance",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
    p: "leading-7",
    muted: "text-muted-foreground text-sm",
    lead: "text-muted-foreground text-xl",
    small: "text-sm leading-none font-medium",
    large: "text-lg font-semibold",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    inlineCode: "bg-muted rounded px-1 py-0.5 font-mono text-sm",
} as const

type TypographyVariant = keyof typeof typographyVariants

type TypographyProps<TComponent extends ElementType> = {
    as?: TComponent
    children?: ReactNode
    className?: string
    text?: ReactNode
    variant?: TypographyVariant
} & Omit<ComponentPropsWithoutRef<TComponent>, "as" | "children" | "className">

export const Typography = <TElement extends ElementType = "p">({
    as,
    children,
    className,
    text,
    variant = "p",
    ...props
}: TypographyProps<TElement>) => {
    const Component = as ?? "p"

    return (
        <Component className={cn(typographyVariants[variant], className)} {...props}>
            {text ?? children}
        </Component>
    )
}

export const TypographyH1 = (props: ComponentProps<"h1">) => {
    return <Typography as="h1" variant="h1" {...props} />
}

export const TypographyH2 = (props: ComponentProps<"h2">) => {
    return <Typography as="h2" variant="h2" {...props} />
}

export const TypographyH3 = (props: ComponentProps<"h3">) => {
    return <Typography as="h3" variant="h3" {...props} />
}

export const TypographyH4 = (props: ComponentProps<"h4">) => {
    return <Typography as="h4" variant="h4" {...props} />
}

export const TypographyP = (props: ComponentProps<"p">) => {
    return <Typography as="p" variant="p" {...props} />
}

export const TypographyMuted = (props: ComponentProps<"p">) => {
    return <Typography as="p" variant="muted" {...props} />
}

export const TypographyLead = (props: ComponentProps<"p">) => {
    return <Typography as="p" variant="lead" {...props} />
}

export const TypographySmall = (props: ComponentProps<"small">) => {
    return <Typography as="small" variant="small" {...props} />
}

export const TypographyLarge = (props: ComponentProps<"div">) => {
    return <Typography as="div" variant="large" {...props} />
}

export const TypographyBlockquote = (props: ComponentProps<"blockquote">) => {
    return <Typography as="blockquote" variant="blockquote" {...props} />
}

export const TypographyInlineCode = (props: ComponentProps<"code">) => {
    return <Typography as="code" variant="inlineCode" {...props} />
}
