type AlertVariant = "default" | "destructive"

export type AlertPayload = {
    title?: string
    message: string
    variant?: AlertVariant
}

type AlertListener = (alert: AlertPayload) => void

const listeners = new Set<AlertListener>()

export const showAlert = (alert: AlertPayload) => {
    listeners.forEach((listener) => listener(alert))
}

export const subscribeToAlerts = (listener: AlertListener) => {
    listeners.add(listener)

    return () => {
        listeners.delete(listener)
    }
}
