import { Bundle, ZObject } from 'zapier-platform-core'
import { composeAPIURL } from './utils'

function test(z: ZObject, bundle: Bundle) {
    return z
        .request({
            url: composeAPIURL('user'),
        })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('The API Key you supplied is invalid')
            }
            return response.json
        })
}

export const authentication = {
    type: 'custom',
    fields: [{ key: 'apiKey', label: 'Read-write API key', required: true, type: 'string' }],
    test,
    connectionLabel: (z: ZObject, bundle: Bundle) => {
        return bundle.inputData.username
    },
}
