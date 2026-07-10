import type { QueryKey, UseQueryOptions } from "@tanstack/react-query"
import { queryOptions, useQuery } from "@tanstack/react-query"

type QueryConfig<TQueryFnData, TError, TData = TQueryFnData> = Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
>

export const createQuery = <TRequest, TQueryFnData, TError>(config: {
    queryKey: (request: TRequest) => QueryKey
    queryFn: (request: TRequest) => Promise<TQueryFnData>
}) => {
    const getQueryOptions = <TData = TQueryFnData>(
        request: TRequest,
        options?: QueryConfig<TQueryFnData, TError, TData>,
    ) =>
        queryOptions({
            queryKey: config.queryKey(request),
            queryFn: () => config.queryFn(request),
            ...options,
        })

    const useQueryHook = <TData = TQueryFnData>(
        request: TRequest,
        options?: QueryConfig<TQueryFnData, TError, TData>,
    ) => useQuery(getQueryOptions<TData>(request, options))

    return {
        getQueryOptions,
        useQuery: useQueryHook,
    }
}
