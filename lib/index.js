"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("./creates/movie");
const action_performed_1 = require("./triggers/action_performed");
const zapier_platform_core_1 = require("zapier-platform-core");
const { version } = require('../package.json');
const addApiKeyHeader = (req, z, bundle) => {
    // Hard-coded api key just to demo. DON'T do auth like this for your production app!
    req.headers = req.headers || {};
    req.headers['X-Api-Key'] = 'secret';
    return req;
};
exports.default = {
    version,
    platformVersion: zapier_platform_core_1.version,
    beforeRequest: [addApiKeyHeader],
    triggers: {
        [action_performed_1.default.key]: action_performed_1.default,
    },
    creates: {
        [movie_1.default.key]: movie_1.default,
    },
};
