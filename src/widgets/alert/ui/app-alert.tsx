import { useEffect, useRef, useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@shared/ui/alert"
import { type AlertPayload, subscribeToAlerts } from "@shared/lib/alert-store"

const ALERT_HIDE_DELAY = 3000

export const AppAlert = () => {
    const [alert, setAlert] = useState<AlertPayload | null>(null)
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        const unsubscribe = subscribeToAlerts((nextAlert) => {
            setAlert(nextAlert)

            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = window.setTimeout(() => {
                setAlert(null)
                timeoutRef.current = null
            }, ALERT_HIDE_DELAY)
        })

        return () => {
            unsubscribe()

            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    if (!alert) {
        return null
    }

    return (
        <div className="fixed top-20 right-6 z-50 w-[360px]">
            <Alert variant={alert.variant}>
                {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
                <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
        </div>
    )
}
