export const getDateTimeAttribute = (value?: string | null) => {
    if (!value || Number.isNaN(new Date(value).getTime())) {
        return undefined
    }

    return value
}

export const formatDateTime = (value?: string | null) => {
    if (!value) {
        return "-"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "-"
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    }).format(date)
}

export const formatShortTime = (value?: string | null) => {
    if (!value) {
        return "-"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return "-"
    }

    return new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date)
}
