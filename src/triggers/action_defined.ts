import { Bundle, ZObject } from 'zapier-platform-core'
import { composeUrl, subscribeHookCreator, unsubscribeHook, ORGANIZATION_AND_PROJECTS_FIELDS } from '../utils'

function getActionDefinition(z: ZObject, bundle: Bundle) {
    return [bundle.cleanedRequest.data]
}

async function getFallbackRealActionDefinition(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeUrl(['api', 'projects', bundle.inputData.project_id, 'actions'], bundle),
    })
    return (response.data as { results: object[] }).results
}

export const ActionDefinedTrigger = {
    key: 'action_defined',
    noun: 'Action',

    display: {
        hidden: true,
        label: 'Action Defined',
        description: 'Triggers when an action is defined by a team member.',
    },

    operation: {
        inputFields: ORGANIZATION_AND_PROJECTS_FIELDS,
        type: 'hook',

        performSubscribe: subscribeHookCreator('action_defined'),
        performUnsubscribe: unsubscribeHook,

        perform: getActionDefinition,
        performList: getFallbackRealActionDefinition,

        sample: {
            id: 666,
            name: 'Hogflix Purchase',
            created_at: '2077-07-04T12:00:00.000000Z',
        },
    },
}
