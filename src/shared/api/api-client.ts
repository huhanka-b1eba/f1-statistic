import * as axios from "axios"
import type { AxiosError, InternalAxiosRequestConfig } from "axios"
import { delay } from "@shared/lib/utils.ts"
import { showAlert } from "@shared/lib/alert-store.ts"

type RetryConfig = InternalAxiosRequestConfig & {
    retryCount?: number
}

const MAX_RETRIES = 3
const RETRY_DELAYS = [200, 400, 800]

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    adapter: "fetch",
    timeout: 10_000,
})

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const config = error.config as RetryConfig | undefined

        if (error.response && error.response.status === 500) {
            showAlert({
                title: "Server error",
                message: "Internal server error",
                variant: "destructive",
            })

            return Promise.reject(error)
        }

        const isNetworkError = !error.response

        if (!isNetworkError || !config) {
            return Promise.reject(error)
        }

        config.retryCount = config.retryCount ?? 0

        if (config.retryCount >= MAX_RETRIES) {
            showAlert({
                title: "Connection error",
                message: "Error connecting to server",
                variant: "destructive",
            })

            return Promise.reject(error)
        }

        const retryDelay = RETRY_DELAYS[config.retryCount]

        config.retryCount += 1

        await delay(retryDelay)

        return apiClient.request(config)
    },
)
