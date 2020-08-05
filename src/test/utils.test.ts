/* globals describe, expect, test */

import { composeURL } from '../utils'

describe('composeURL', () => {
    test('compose URL 1', () => {
        const composedURL: string = composeURL(['setup'], 'https://app.posthog.com/')
        expect(composedURL).toEqual('https://app.posthog.com/setup/')
    })
    test('compose URL 2', () => {
        const composedURL: string = composeURL(['foo', 'bar bar'], 'https://company.com/posthog/')
        expect(composedURL).toEqual('https://company.com/posthog/foo/bar%20bar/')
    })
    test('compose URL API 1', () => {
        const composedAPIURL: string = composeURL(['api', 'hook'], 'https://app.posthog.com/')
        expect(composedAPIURL).toEqual('https://app.posthog.com/api/hook/')
    })
    test('compose URL API 2', () => {
        const composedAPIURL: string = composeURL(['api', 'bar', 'foo'], 'https://company.com/posthog')
        expect(composedAPIURL).toEqual('https://company.com/posthog/api/bar/foo/')
    })
    test('compose URL API with query params', () => {
        const composedAPIURL: string = composeURL(['api', 'bar', '?id=2&foo=bar'], 'https://posthog.company.com/')
        expect(composedAPIURL).toEqual('https://posthog.company.com/api/bar/?id=2&foo=bar')
    })
})
