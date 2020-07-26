import { Bundle, ZObject } from 'zapier-platform-core'
import { composeAPIURL } from '../utils'

async function subscribeHook(z: ZObject, bundle: Bundle) {
    // bundle.targetUrl has the Hook URL this app should call
    const data = {
        url: bundle.targetUrl,
        style: bundle.inputData.style,
    }
    const response = await z.request({
        url: composeAPIURL('api/hooks'),
        method: 'POST',
        body: data,
    })
    return response.data
}

async function unsubscribeHook(z: ZObject, bundle: Bundle) {
    // bundle.subscribeData contains the parsed response JSON from the subscribe request made initially
    const hookId = bundle.subscribeData!.id
    const response = await z.request({
        url: composeAPIURL(`api/hooks/${hookId}`),
        method: 'DELETE',
    })
    return response.data
}

function getActionDefinition(z: ZObject, bundle: Bundle) {
    // bundle.cleanedRequest will include the parsed JSON object (if it's not a test poll)
    // and also a .querystring property with the URL's query string
    const recipe = {
        id: bundle.cleanedRequest.id,
        name: bundle.cleanedRequest.name,
        directions: bundle.cleanedRequest.directions,
        style: bundle.cleanedRequest.style,
        authorId: bundle.cleanedRequest.authorId,
        createdAt: bundle.cleanedRequest.createdAt,
    }
    return [recipe]
}

async function getFallbackRealActionDefinition(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeAPIURL('event/actions'),
        params: {
            orderBy: ['-timestamp'],
        },
    })
    return response.data
}

export const ActionDefinedTrigger = {
    key: 'action_defined',
    noun: 'Action',

    display: {
        label: 'Action Defined',
        description: 'Triggers when an action is defined by an administrator.',
    },

    operation: {
        inputFields: [],
        type: 'hook',

        performSubscribe: subscribeHook,
        performUnsubscribe: unsubscribeHook,

        perform: getActionDefinition,
        performList: getFallbackRealActionDefinition,

        sample: {
            id: 1,
            name: 'Hogflix Purchase',
            timestamp: '2077-07-04T12:00:00.123456Z',
        },

        // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
        // field definitions. The result will be used to augment the sample.
        // outputFields: () => { return []; }
        // Alternatively, a static field definition should be provided, to specify labels for the fields
        outputFields: [
            { key: 'id', label: 'ID' },
            { key: 'createdAt', label: 'Created At' },
            { key: 'name', label: 'Name' },
            { key: 'directions', label: 'Directions' },
            { key: 'authorId', label: 'Author ID' },
            { key: 'style', label: 'Style' },
        ],
    },
}
