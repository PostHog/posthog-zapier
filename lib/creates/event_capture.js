"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// You can optionally add the shape of the inputData in bundle, which will pass that
// info down into the function and tests
const perform = async (z, bundle) => {
    const response = await z.request({
        method: 'POST',
        url: utils_1.composeAPIURL('e'),
        body: {
            title: bundle.inputData.title,
            year: bundle.inputData.year,
        },
    });
    return response.data;
};
exports.default = {
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
