import { Bundle, ZObject } from 'zapier-platform-core'
import { UserType } from '../types'
import { composeUrl } from '../utils'

export const ProjectCreatedTrigger = {
    key: 'project_created',
    noun: 'Project',

    display: {
        hidden: true,
        label: 'Project Created',
        description: 'Triggers when a new project is created or becomes accessible.',
    },

    operation: {
        perform: async (z: ZObject, bundle: Bundle) => {
            const response = await z.request({
                url: composeUrl(['api', 'users', '@me'], bundle),
            })
            const organization = (response.data as UserType).organization
            if (!organization) {
                throw new Error("You don't belong to any PostHog organization! Create or join one.")
            }
            return organization.teams
        },
    },
}
