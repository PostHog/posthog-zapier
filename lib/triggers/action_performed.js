"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const perform = async (z, bundle) => {
    const response = await z.request(utils_1.composeAPIURL('hook/action_performed'));
    return response.data;
};
exports.default = {
    key: 'action_performed',
    noun: 'Action',
    display: {
        label: 'Action Performed',
        description: 'Triggers when an action is performed by a user.',
    },
    operation: {
        perform,
        sample: {
            id: '1',
            title: 'example',
        },
    },
};
