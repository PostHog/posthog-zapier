import { Bundle, HttpRequestOptions, ZObject } from 'zapier-platform-core'
import {
    DEFAULT_API_HOST,
    POSTHOG_CLOUD_EU_HOST,
    POSTHOG_CLOUD_US_HOST,
    POSTHOG_CLOUD_US_LEGACY_HOST,
    composeUrl,
} from './utils'

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
            // NOTE: If user is logged into `eu.` and not `us.`, they will be auto-redirected to the logged-in region
            helpText:
                'Create a fresh key in the "Personal API keys" section of PostHog settings ' +
                '[from this link](https://us.posthog.com/project/2/settings/user-api-keys?preset=zapier).',
            required: true,
            type: 'string',
        },
        {
            key: 'apiHost',
            label: 'API Host',
            helpText: `The default is PostHog Cloud US. For PostHog Cloud EU, set \`${POSTHOG_CLOUD_EU_HOST}\`. For a self-hosted hobby deployment, set your instance's public host.`,
            placeholder: DEFAULT_API_HOST,
            required: false,
            type: 'string',
        },
    ],
    test,
    connectionLabel: (_: ZObject, bundle: Bundle) => {
        switch (bundle.authData.apiHost) {
            case POSTHOG_CLOUD_US_HOST:
            case POSTHOG_CLOUD_US_LEGACY_HOST:
                return 'PostHog Cloud US'
            case POSTHOG_CLOUD_EU_HOST:
                return 'PostHog Cloud EU'
            default:
                return bundle.authData.apiHost.split('://')[1]
        }
    },
}

export function includeToken(request: HttpRequestOptions, z: ZObject, bundle: Bundle): HttpRequestOptions {
    if (bundle.authData.personalApiKey) {
        if (!request.headers) request.headers = {}
        request.headers['Authorization'] = `Bearer ${bundle.authData.personalApiKey}`
    }
    return request
}
