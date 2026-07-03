import { Input } from "@shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"
import { SearchIcon } from "lucide-react"

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
                <h2 className="m-0 text-lg font-semibold">Select a session</h2>
            </div>

            <div className="flex gap-3">
                <div className="w-32">
                    <Select value={year} onValueChange={onYearChange}>
                        <SelectTrigger className="w-full rounded-sm">
                            <SelectValue placeholder="2024" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-40">
                    <Select value={sessionName} onValueChange={onSessionNameChange}>
                        <SelectTrigger className="w-full rounded-sm">
                            <SelectValue placeholder="All Races" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sessions</SelectItem>
                            <SelectItem value="Race">Race</SelectItem>
                            <SelectItem value="Qualifying">Qualifying</SelectItem>
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
