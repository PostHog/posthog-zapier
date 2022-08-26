import { Bundle, ZObject } from 'zapier-platform-core'
import { OrganizationType } from '../types'
import { composeUrl } from '../utils'

export const ProjectCreatedTrigger = {
    key: 'project_created',
    noun: 'Project',

    display: {
        hidden: true,
        label: 'Project Created',
    },

    operation: {
        perform: async (z: ZObject, bundle: Bundle) => {
            const organizationId = bundle.inputData.organization_id
            const response = await z.request({
                url: composeUrl(['api', 'organizations', organizationId], bundle),
            })
            return (response.data as OrganizationType).teams
        },
    },
}
