import { useState } from "react"

import { Button } from "@shared/ui/button"
import { TypographyLarge, TypographyMuted } from "@shared/ui/typography"

type ExpandableListSectionProps<TItem> = {
    title: string
    items: TItem[]
    emptyMessage: string
    itemClassName: string
    getItemKey: (item: TItem) => string
    renderItem: (item: TItem, index: number) => React.ReactNode
}

const DEFAULT_VISIBLE_ITEMS = 3

export const ExpandableListSection = <TItem,>({
    title,
    items,
    emptyMessage,
    itemClassName,
    getItemKey,
    renderItem,
}: ExpandableListSectionProps<TItem>) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const visibleItems = isExpanded ? items : items.slice(0, DEFAULT_VISIBLE_ITEMS)
    const hasMoreItems = items.length > DEFAULT_VISIBLE_ITEMS

    return (
        <div className="rounded-md border p-3">
            <div className="flex items-baseline justify-between gap-4">
                <TypographyMuted className="text-xs font-medium tracking-wide uppercase">
                    {title}
                </TypographyMuted>
                <TypographyLarge className="font-mono leading-none">{items.length}</TypographyLarge>
            </div>

            {items.length > 0 ? (
                <>
                    <div className={itemClassName}>
                        {visibleItems.map((item, index) => (
                            <div key={getItemKey(item)}>{renderItem(item, index)}</div>
                        ))}
                    </div>

                    {hasMoreItems && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="xs"
                            className="text-primary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/30 mt-2 px-2"
                            onClick={() => setIsExpanded((value) => !value)}
                        >
                            {isExpanded ? "Свернуть" : "Подробнее"}
                        </Button>
                    )}
                </>
            ) : (
                <TypographyMuted className="mt-2">{emptyMessage}</TypographyMuted>
            )}
        </div>
    )
}
