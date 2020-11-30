import { Bundle, ZObject } from 'zapier-platform-core'
import { composeUrl } from '../utils'

export const ProjectCreatedTrigger = {
    key: 'project_created',
    noun: 'Project',

    display: {
        label: 'Project Created',
        description: 'Triggers when a new project is created or becomes accessible.',
        hidden: true,
    },

    operation: {
        perform: async (z: ZObject, bundle: Bundle) => {
            const response = await z.request({
                url: composeUrl(['api', 'user'], bundle),
            })
            return (response.data as { teams: { id: number; name: string }[] }).teams
        },
    },
}
