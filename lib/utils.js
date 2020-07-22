"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeAPIURL = void 0;
const settings_1 = require("./settings");
function composeAPIURL(apiPath) {
    return `${settings_1.API_HOST.replace(/[/]+$/, '')}/${apiPath.replace(/^[/]+/, '')}`;
}
exports.composeAPIURL = composeAPIURL;
