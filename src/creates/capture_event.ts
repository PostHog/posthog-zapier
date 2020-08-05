import { Bundle, ZObject } from 'zapier-platform-core'
import { composeURL } from '../utils'

interface InputData {
    event_name: string
    user_distinct_id: string
    timestamp: string
    [property: string]: any
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
    const response = await z.request({
        method: 'POST',
        url: composeURL(['capture']),
        body: {
            event: bundle.inputData.event,
            properties: {
                distinct_id: bundle.inputData.distinct_id,
            },
            extra_properties_json: bundle.inputData.extra_properties_json,
            timestamp: bundle.inputData.timestamp,
        },
    })
    return response.data
}

export const EventCaptureCreate = {
    key: 'event_capture',
    noun: 'Event',

    display: {
        label: 'Capture Event',
        description: 'Captures an event.',
    },

    operation: {
        perform,
        inputFields: [
            { key: 'event', label: 'Event Name', required: true },
            { key: 'distinct_id', label: 'User PostHog Distinct ID', required: true },
            {
                key: 'extra_properties_json',
                label: 'Custom Event Properties',
                helpText:
                    'Properties in JSON format, e.g. `{ "price": 24.99 }`. Make sure that this doesn\'t end up malformed!',
            },
            {
                key: 'timestamp',
                type: 'datetime',
                helpText: 'If not specified, moment of event capture will be assumed.',
            },
        ],
        sample: {
            id: 1,
        },
    },
}
