import { Bundle, ZObject } from 'zapier-platform-core'
import { unsubscribeHook, ORGANIZATION_AND_PROJECTS_FIELDS, composeUrl } from '../utils'

function getAnnotation(z: ZObject, bundle: Bundle) {
    return [bundle.cleanedRequest.data]
}

async function getFallbackRealAnnotation(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeUrl(['api', 'projects', bundle.inputData.project_id, 'annotations'], bundle),
    })
    return (response.data as { results: object[] }).results
}

export const AnnotationCreatedTrigger = {
    key: 'annotation_created',
    noun: 'Annotation',

    display: {
        hidden: true,
        label: 'Annotation Created',
        description: 'Triggers when an annotation is created by a team member.',
    },

    operation: {
        inputFields: [
            {
                key: 'deprecation_notice',
                helpText: '**This trigger is no longer available.**',
                type: 'copy',
            },
            ...ORGANIZATION_AND_PROJECTS_FIELDS,
        ],
        type: 'hook',

        performSubscribe: () => {
            throw new Error('Annotation Created triggers can no longer be subscribed to.')
        },
        performUnsubscribe: unsubscribeHook,

        perform: getAnnotation,
        performList: getFallbackRealAnnotation,
    },
}
