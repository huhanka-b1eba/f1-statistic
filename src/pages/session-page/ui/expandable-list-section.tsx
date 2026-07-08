import type { ReactNode } from "react"
import { useState } from "react"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/ui/button"
import { TypographyLarge, TypographyMuted } from "@shared/ui/typography"

type ExpandableListSectionProps<TItem> = {
    items: TItem[]
    getItemKey: (item: TItem) => string
    renderItem: (item: TItem, index: number) => ReactNode
    buttonClassName?: string
    className?: string
    collapseLabel?: string
    emptyClassName?: string
    emptyMessage?: string
    expandLabel?: string
    headerClassName?: string
    itemClassName?: string
    listClassName?: string
    title?: ReactNode
    visibleItemsCount?: number
}

const DEFAULT_VISIBLE_ITEMS = 3

export const ExpandableListSection = <TItem,>({
    items,
    getItemKey,
    renderItem,
    buttonClassName,
    className,
    collapseLabel = "Свернуть",
    emptyClassName,
    emptyMessage,
    expandLabel = "Подробнее",
    headerClassName,
    itemClassName,
    listClassName,
    title,
    visibleItemsCount = DEFAULT_VISIBLE_ITEMS,
}: ExpandableListSectionProps<TItem>) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const visibleItems = isExpanded ? items : items.slice(0, visibleItemsCount)
    const hasMoreItems = items.length > visibleItemsCount

    return (
        <div className={className}>
            {title && (
                <div className={cn("flex items-baseline justify-between gap-4", headerClassName)}>
                    <TypographyMuted className="text-xs font-medium tracking-wide uppercase">
                        {title}
                    </TypographyMuted>
                    <TypographyLarge className="font-mono leading-none">
                        {items.length}
                    </TypographyLarge>
                </div>
            )}

            {items.length > 0 ? (
                <>
                    <div className={listClassName}>
                        {visibleItems.map((item, index) => (
                            <div key={getItemKey(item)} className={itemClassName}>
                                {renderItem(item, index)}
                            </div>
                        ))}
                    </div>

                    {hasMoreItems && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="xs"
                            className={cn(
                                "text-primary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/30 mt-2 px-2",
                                buttonClassName,
                            )}
                            onClick={() => setIsExpanded((value) => !value)}
                        >
                            {isExpanded ? collapseLabel : expandLabel}
                        </Button>
                    )}
                </>
            ) : emptyMessage ? (
                <TypographyMuted className={cn("mt-2", emptyClassName)}>
                    {emptyMessage}
                </TypographyMuted>
            ) : null}
        </div>
    )
}
