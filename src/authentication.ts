import { Bundle, HttpRequestOptions, ZObject } from 'zapier-platform-core'
import { composeURL } from './utils'

async function test(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeURL(['api', 'dashboard']),
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
            key: 'personal_api_key',
            label: 'Personal API Key',
            helpText: `Get a fresh key from the [Setup page](${composeURL(['setup'])}).`,
            required: true,
            type: 'string',
        },
    ],
    test,
    connectionLabel: (z: ZObject, bundle: Bundle) => {
        return bundle.inputData.username
    },
}

export function includeToken(request: HttpRequestOptions, z: ZObject, bundle: Bundle): HttpRequestOptions {
    if (bundle.authData.personal_api_key) {
        if (!request.headers) request.headers = {}
        request.headers['Authorization'] = `Bearer ${bundle.authData.personal_api_key}`
    }
    return request
}
