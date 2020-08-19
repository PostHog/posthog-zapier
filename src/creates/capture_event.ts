import { Bundle, ZObject } from 'zapier-platform-core'
import { composeUrl } from '../utils'

interface InputData {
    event_name: string
    user_distinct_id: string
    timestamp: string
    [property: string]: any
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
    const properties: Record<string, any> = bundle.inputData.properties
    // try to interpret property values as JSON (else keep string)
    for (const [key, value] of Object.entries(properties)) {
        try {
            properties[key] = z.JSON.parse(value)
        } catch {}
    }
    const response = await z.request({
        method: 'POST',
        url: composeUrl(['capture'], bundle),
        body: {
            event: bundle.inputData.name,
            properties: {
                ...properties,
                distinct_id: bundle.inputData.distinct_id,
            },
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
            { key: 'name', label: 'Event Name', required: true },
            { key: 'distinct_id', label: 'User PostHog Distinct ID', required: true },
            {
                key: 'properties',
                label: 'Event Properties',
                dict: true,
                helpText:
                    'Values (right side) will be parsed as JSON, so that e.g. `24.99` is interpreted as a number, while `"24.99"` as a string. Take caution.',
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
