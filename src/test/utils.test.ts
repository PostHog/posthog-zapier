/* globals describe, expect, test */

import { composeURL, composeAPIURL } from '../utils'

describe('composeURL', () => {
    test('compose URL 1', () => {
        const composedURL: string = composeURL('/setup', 'https://app.posthog.com/')
        expect(composedURL).toEqual('https://app.posthog.com/setup')
    })
    test('compose URL 2', () => {
        const composedURL: string = composeURL('foo', 'https://company.com/posthog')
        expect(composedURL).toEqual('https://company.com/posthog/foo')
    })
})

describe('composeAPIURL', () => {
    test('compose API URL 1', () => {
        const composedAPIURL: string = composeAPIURL('/hook/', 'https://app.posthog.com/')
        expect(composedAPIURL).toEqual('https://app.posthog.com/api/hook/')
    })
    test('compose API URL 2', () => {
        const composedAPIURL: string = composeAPIURL('/bar', 'https://company.com/posthog')
        expect(composedAPIURL).toEqual('https://company.com/posthog/api/bar')
    })
})
