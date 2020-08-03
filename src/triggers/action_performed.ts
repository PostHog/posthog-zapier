import { Bundle, ZObject } from 'zapier-platform-core'
import { composeAPIURL, subscribeHookCreator, unsubscribeHook } from '../utils'

function getActionPerformance(z: ZObject, bundle: Bundle) {
    return [bundle.cleanedRequest.data]
}

async function getFallbackRealActionPerformance(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeAPIURL('event/actions'),
        body: {
            action_id: bundle.inputData.action_id,
        },
    })
    return (response.data as { results: object[] }).results
}

export const ActionPerformedTrigger = {
    key: 'action_performed',
    noun: 'Action',

    display: {
        label: 'Action Performed',
        description: 'Triggers when an action is performed by a user.',
    },

    operation: {
        inputFields: [
            {
                key: 'action_id',
                label: 'Action',
                helpText: 'If not specified, trigger will fire when any action is performed.',
                dynamic: 'action_defined.id.name',
            },
        ],

        type: 'hook',

        performSubscribe: subscribeHookCreator('action_performed', { resource_id: 'action_id' }),
        performUnsubscribe: unsubscribeHook,

        perform: getActionPerformance,
        performList: getFallbackRealActionPerformance,

        sample: {
            id: '42-666',
            event: {
                id: 666,
                distinct_id: '867499ab-c4f6-4a0d-befb-9d82fad9a73f',
                properties: {
                    $lib: 'web',
                    $browser: 'Firefox',
                    $current_url: 'https://example.comz/',
                },
                elements: [],
                event: 'purchase',
                timestamp: '1953-07-04T12:00:00.123456Z',
                person: '867499ab-c4f6-4a0d-befb-9d82fad9a73f',
            },
            action: {
                name: 'Example Purchase',
                id: 42,
            },
        },
    },
}
