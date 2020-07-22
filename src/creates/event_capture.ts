import { Bundle, ZObject } from 'zapier-platform-core'
import { composeAPIURL } from '../utils'

interface InputData {
  event_name: string
  user_distinct_id: string
  timestamp: string
  [property: string]: any
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const response = await z.request({
    method: 'POST',
    url: composeAPIURL('capture'),
    body: {
      event: bundle.inputData.event_name,
      properties: {
          distinct_id: bundle.inputData.user_distinct_id,
      },
      timestamp: bundle.inputData.timestamp
    },
  });
  return response.data;
};

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
      { key: 'title', required: true },
      { key: 'year', type: 'integer' },
    ],
    sample: {
      // fields
    },
  },
};
