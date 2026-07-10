import type { PositionTickDriver } from "../../model/positions-chart"

type PositionAxisTickProps = {
    x?: number
    y?: number
    payload?: {
        value: number
    }
    driversByPosition: Map<number, PositionTickDriver>
}

export const PositionAxisTick = ({
    x = 0,
    y = 0,
    payload,
    driversByPosition,
}: PositionAxisTickProps) => {
    const position = Number(payload?.value)
    const driver = driversByPosition.get(position)

    if (!driver) {
        return (
            <text
                x={x + 4}
                y={y}
                fill="var(--muted-foreground)"
                fontSize={12}
                dominantBaseline="middle"
            >
                P{position}
            </text>
        )
    }

    return (
        <g transform={`translate(${x + 4}, ${y - 12})`}>
            {driver.headshotUrl ? (
                <image
                    href={driver.headshotUrl}
                    x={0}
                    y={0}
                    width={24}
                    height={24}
                    preserveAspectRatio="xMidYMid slice"
                />
            ) : (
                <circle cx={12} cy={12} r={12} fill="var(--muted)" />
            )}
            <text
                x={32}
                y={12}
                fill={driver.color}
                fontSize={12}
                fontWeight={700}
                dominantBaseline="middle"
            >
                {driver.acronym}
            </text>
        </g>
    )
}
