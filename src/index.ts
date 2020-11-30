import { version as platformVersion } from 'zapier-platform-core'

import { authentication, includeToken } from './authentication'
import { EventCaptureCreate } from './creates/capture_event'
import { ProjectCreatedTrigger } from './triggers/project_created'
import { ActionDefinedTrigger } from './triggers/action_defined'
import { ActionPerformedTrigger } from './triggers/action_performed'
import { AnnotationCreatedTrigger } from './triggers/annotation_created'

const { version } = require('../package.json') // require() to bypass rootDir restriction

export default {
    version,
    platformVersion,
    authentication,
    beforeRequest: [includeToken],
    triggers: {
        [ProjectCreatedTrigger.key]: ProjectCreatedTrigger,
        [ActionDefinedTrigger.key]: ActionDefinedTrigger,
        [ActionPerformedTrigger.key]: ActionPerformedTrigger,
        [AnnotationCreatedTrigger.key]: AnnotationCreatedTrigger,
    },
    creates: {
        // Disabled as capture endpoint needs per-project rework
        // [EventCaptureCreate.key]: EventCaptureCreate,
    },
}
