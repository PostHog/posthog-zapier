import { version as platformVersion } from 'zapier-platform-core'

import { authentication, includeToken } from './authentication'
import { EventCaptureCreate } from './creates/capture_event'
import { ActionPerformedTrigger } from './triggers/action_performed'

const { version } = require('../package.json') // require() to bypass rootDir restriction

export default {
    version,
    platformVersion,
    authentication,
    beforeRequest: [includeToken],
    triggers: {
        [ActionPerformedTrigger.key]: ActionPerformedTrigger,
    },
    creates: {
        [EventCaptureCreate.key]: EventCaptureCreate,
    },
}
