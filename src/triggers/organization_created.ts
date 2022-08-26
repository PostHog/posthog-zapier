import { Bundle, ZObject } from 'zapier-platform-core'
import { UserType } from '../types'
import { composeUrl } from '../utils'

export const OrganizationCreatedTrigger = {
    key: 'organization_created',
    noun: 'Organization',

    display: {
        hidden: true,
        label: 'Organization Created',
    },

    operation: {
        perform: async (z: ZObject, bundle: Bundle) => {
            const response = await z.request({
                url: composeUrl(['api', 'users', '@me'], bundle),
            })
            return (response.data as UserType).organizations
        },
    },
}
