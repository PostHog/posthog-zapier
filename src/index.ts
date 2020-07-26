import { Bundle, HttpRequestOptions, ZObject } from 'zapier-platform-core'
import { version as platformVersion } from 'zapier-platform-core'

import { authentication } from './authentication'
import { EventCaptureCreate } from './creates/capture_event'
import { ActionDefinedTrigger } from './triggers/action_defined'
import { ActionPerformedTrigger } from './triggers/action_performed'

const { version } = require('../package.json') // require() to bypass rootDir restriction

function includeAPIKey(request: HttpRequestOptions, z: ZObject, bundle: Bundle): HttpRequestOptions {
    if (bundle.authData.api_key) {
        if (!request.params) request.params = {}
        ;(request.params as { api_key: string }).api_key = bundle.authData.apiKey
    }
    return request
}

export default {
    version,
    platformVersion,
    authentication,
    beforeRequest: [includeAPIKey],
    triggers: {
        [ActionDefinedTrigger.key]: ActionDefinedTrigger,
        [ActionPerformedTrigger.key]: ActionPerformedTrigger,
    },
    creates: {
        [EventCaptureCreate.key]: EventCaptureCreate,
    },
}
