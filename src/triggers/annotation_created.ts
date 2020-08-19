import { Bundle, ZObject } from 'zapier-platform-core'
import { composeUrl, subscribeHookCreator, unsubscribeHook } from '../utils'

function getAnnotation(z: ZObject, bundle: Bundle) {
    return [bundle.cleanedRequest.data]
}

async function getFallbackRealAnnotation(z: ZObject, bundle: Bundle) {
    const response = await z.request({
        url: composeUrl(['api', 'annotation'], bundle),
    })
    return (response.data as { results: object[] }).results
}

export const AnnotationCreatedTrigger = {
    key: 'annotation_created',
    noun: 'Annotation',

    display: {
        label: 'Annotation Created',
        description: 'Triggers when an annotation is created by a team member.',
    },

    operation: {
        inputFields: [],
        type: 'hook',

        performSubscribe: subscribeHookCreator('annotation_created'),
        performUnsubscribe: unsubscribeHook,

        perform: getAnnotation,
        performList: getFallbackRealAnnotation,

        sample: {
            id: 99,
            content: '2.0 Launch',
            date_marker: '2077-11-11T12:34:56Z',
            creation_type: 'USR',
            dashboard_item: null,
            created_by: {
                id: 67,
                distinct_id: 'NVsxdsUOiDn3AxVF5LguBWDlZBe8eZy-4rcefx16AIg',
                first_name: 'Joe Dohn',
                email: 'joe@example.com',
            },
            created_at: '2077-11-11T12:34:56Z',
            updated_at: '2077-11-11T12:34:56Z',
            deleted: false,
            apply_all: true,
        },
    },
}
