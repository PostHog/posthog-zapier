import { unsubscribeHook, TRIGGER_PREMIUM_NOTICE_FIELD, ORGANIZATION_AND_PROJECTS_FIELDS } from '../utils'

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
    },
}
