type HighlightTextProps = {
    text?: string
    query: string
}

const escapeRegExp = (value: string) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export const HighlightText = ({ text, query }: HighlightTextProps) => {
    if (!text) {
        return null
    }

    const searchValue = query.trim()

    if (!searchValue) {
        return <>{text}</>
    }

    const regex = new RegExp(`(${escapeRegExp(searchValue)})`, "gi")
    const parts = text.split(regex)

    return (
        <>
            {parts.map((part, index) => {
                const isMatch = part.toLowerCase() === searchValue.toLowerCase()

                if (!isMatch) {
                    return <span key={index}>{part}</span>
                }

                return (
                    <mark key={index} className="bg-destructive text-foreground px-0.5">
                        {part}
                    </mark>
                )
            })}
        </>
    )
}
