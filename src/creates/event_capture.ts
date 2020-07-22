import { Bundle, ZObject } from 'zapier-platform-core'
import { composeAPIURL } from '../utils'

// You can optionally add the shape of the inputData in bundle, which will pass that
// info down into the function and tests
const perform = async (
  z: ZObject,
  bundle: Bundle<{ title: string; year: number }>
) => {
  const response = await z.request({
    method: 'POST',
    url: composeAPIURL('e'),
    body: {
      title: bundle.inputData.title,
      year: bundle.inputData.year,
    },
  });
  return response.data;
};

export default {
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
      id: '1',
      title: 'example',
    },
  },
};
