import { Bundle, ZObject } from 'zapier-platform-core'
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
            return (response.data as { teams: { id: number; name: string }[] }).teams
        },
    },
}
