import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

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

const typographyDefaultTags = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    p: "p",
    muted: "p",
    lead: "p",
    small: "small",
    large: "div",
    blockquote: "blockquote",
    inlineCode: "code",
} as const satisfies Record<TypographyVariant, ElementType>

type TypographyProps<TComponent extends ElementType> = {
    as?: TComponent
    children?: ReactNode
    className?: string
    variant?: TypographyVariant
} & Omit<ComponentPropsWithoutRef<TComponent>, "as" | "children" | "className">

export const Typography = <TElement extends ElementType = "p">({
    as,
    children,
    className,
    variant = "p",
    ...props
}: TypographyProps<TElement>) => {
    const Component = as ?? typographyDefaultTags[variant]

    return (
        <Component className={cn(typographyVariants[variant], className)} {...props}>
            {children}
        </Component>
    )
}
