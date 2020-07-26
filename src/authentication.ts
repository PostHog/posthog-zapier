import { Bundle, ZObject } from 'zapier-platform-core'
import { composeURL, composeAPIURL } from './utils'

async function test(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeAPIURL('dashboard'),
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
            key: 'api_key',
            label: 'Personal Access Token',
            helpText: `Get your token the [Setup page](${composeURL('setup')}).`,
            required: true,
            type: 'string',
        },
    ],
    test,
    connectionLabel: (z: ZObject, bundle: Bundle) => {
        return bundle.inputData.username
    },
}
