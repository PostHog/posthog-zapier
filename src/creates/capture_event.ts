import { Bundle, ZObject } from 'zapier-platform-core'
import { composeUrl, PROJECT_FIELD } from '../utils'

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
        } catch {
            // if parsing fails, leave string value in place
        }
    }
    const response = await z.request({
        method: 'POST',
        url: composeUrl(['capture'], bundle),
        body: {
            api_key: bundle.authData.personalApiKey,
            project_id: bundle.inputData.project_id,
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
            PROJECT_FIELD,
            { key: 'name', label: 'Event Name', required: true },
            { key: 'distinct_id', label: 'User PostHog Distinct ID', required: true },
            {
                key: 'properties',
                label: 'Event Properties',
                dict: true,
                helpText:
                    'JSON parsing of values (right-hand side) will be attempted, so that e.g. `24.99` is interpreted as a number, while `"24.99"` as a string. Unparsable values will be left as strings. If you want to ensure value will stay a string, enclose it in double quotes.',
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
