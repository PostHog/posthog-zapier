import { Bundle, HttpRequestOptions, ZObject } from 'zapier-platform-core'
import { version as platformVersion } from 'zapier-platform-core'

import { authentication } from './authentication'
import { EventCaptureCreate } from './creates/event_capture'
import { ActionPerformedTrigger } from './triggers/action_performed'

const { version } = require('../package.json') // require() to bypass rootDir restriction

function includeApiKey(request: HttpRequestOptions, z: ZObject, bundle: Bundle): HttpRequestOptions {
    if (bundle.authData.apiKey) {
        if (!request.params) request.params = {}
        ;(request.params as { api_key: string }).api_key = bundle.authData.apiKey
    }
    return request
}

export default {
    version,
    platformVersion,
    authentication,
    beforeRequest: [includeApiKey],
    triggers: {
        [ActionPerformedTrigger.key]: ActionPerformedTrigger,
    },
    creates: {
        [EventCaptureCreate.key]: EventCaptureCreate,
    },
}
