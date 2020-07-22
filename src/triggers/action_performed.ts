import { Bundle, ZObject } from 'zapier-platform-core'
import { composeAPIURL } from '../utils'

const perform = async (z: ZObject, bundle: Bundle) => {
    const response = await z.request(composeAPIURL('hook/action_performed'))
    return response.data
}

export const ActionPerformedTrigger = {
    key: 'action_performed',
    noun: 'Action',

    display: {
        label: 'Action Performed',
        description: 'Triggers when an action is performed by a user.',
    },

    operation: {
        perform,
        sample: {
            id: 1,
        },
    },
}
