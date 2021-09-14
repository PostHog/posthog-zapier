import { Bundle, HttpRequestOptions, ZObject } from 'zapier-platform-core'
import { DEFAULT_API_HOST, DEFAULT_LABEL, POSTHOG_CLOUD_HOST, composeUrl } from './utils'

async function test(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeUrl(['api', 'users', '@me'], bundle),
    })
    if (response.status === 401 || response.status === 403) {
        throw new Error('The personal access token you supplied is invalid')
    }
    return response.json
}

export const authentication = {
    type: 'custom',
    fields: [
        {
            key: 'personalApiKey',
            label: 'Personal API Key',
            helpText: `Get a fresh key from the My Settings page in PostHog. More about personal API keys in [PostHog Docs](https://posthog.com/docs/api/overview#personal-api-keys-recommended).`,
            required: true,
            type: 'string',
        },
        {
            key: 'apiHost',
            label: 'API Host',
            helpText: `Set your own if not connecting with ${
                DEFAULT_API_HOST === POSTHOG_CLOUD_HOST ? 'PostHog Cloud' : 'the default host'
            }.`,
            placeholder: DEFAULT_API_HOST,
            required: false,
            type: 'string',
        },
    ],
    test,
    connectionLabel: (_: ZObject, bundle: Bundle) => {
        return bundle.authData.apiHost === DEFAULT_API_HOST ? DEFAULT_LABEL : bundle.authData.apiHost.split('://')[1]
    },
}

export function includeToken(request: HttpRequestOptions, z: ZObject, bundle: Bundle): HttpRequestOptions {
    if (bundle.authData.personalApiKey) {
        if (!request.headers) request.headers = {}
        request.headers['Authorization'] = `Bearer ${bundle.authData.personalApiKey}`
    }
    return request
}
