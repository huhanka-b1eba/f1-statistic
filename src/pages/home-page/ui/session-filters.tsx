import { SearchIcon } from "lucide-react"

import { Input } from "@shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"
import { Typography } from "@shared/ui/typography"

const yearOptions = [
    { label: "All", value: "all" },
    { label: "2026", value: "2026" },
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
] as const

const sessionNameOptions = [
    { label: "All Sessions", value: "all" },
    { label: "Race", value: "Race" },
    { label: "Qualifying", value: "Qualifying" },
] as const

type SessionFiltersProps = {
    year: string
    sessionName: string
    search: string
    onYearChange: (value: string) => void
    onSessionNameChange: (value: string) => void
    onSearchChange: (value: string) => void
}

export const SessionFilters = ({
    year,
    sessionName,
    search,
    onYearChange,
    onSessionNameChange,
    onSearchChange,
}: SessionFiltersProps) => {
    return (
        <div className="mb-4">
            <div className="mb-3 text-left">
                <Typography variant="h2" className="m-0 text-lg">
                    Select a session
                </Typography>
            </div>

            <div className="flex gap-3">
                <div className="w-32">
                    <Select value={year} onValueChange={onYearChange}>
                        <SelectTrigger className="w-full rounded-sm">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>

                        <SelectContent>
                            {yearOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-40">
                    <Select value={sessionName} onValueChange={onSessionNameChange}>
                        <SelectTrigger className="w-full rounded-sm">
                            <SelectValue placeholder="All Sessions" />
                        </SelectTrigger>

                        <SelectContent>
                            {sessionNameOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="relative w-72">
                    <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />

                    <Input
                        id="session-search"
                        className="rounded-sm pl-8"
                        placeholder="Поиск"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
