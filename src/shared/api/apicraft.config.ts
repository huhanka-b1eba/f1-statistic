import { apicraft } from "@siberiacancode/apicraft"

export default apicraft([
    {
        input: "src/shared/api/openapi.json",
        output: "src/shared/api/generated",
        baseUrl: "/api",
        nameBy: "path",
        groupBy: "tags",
        instance: {
            name: "axios",
            runtimeInstancePath: "src/shared/api/api-client",
        },
    },
])
