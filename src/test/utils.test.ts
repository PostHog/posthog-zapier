/* globals describe, expect, test */

import { composeUrl } from '../utils'
import { Bundle } from 'zapier-platform-core'

describe('composeUrl', () => {
    test('compose URL 1', () => {
        const composedURL: string = composeUrl(['setup'], 'https://app.posthog.com/')
        expect(composedURL).toEqual('https://app.posthog.com/setup/')
    })
    test('compose URL 2', () => {
        const composedURL: string = composeUrl(['foo', 'bar bar'], 'https://company.com/posthog/')
        expect(composedURL).toEqual('https://company.com/posthog/foo/bar%20bar/')
    })
    test('compose URL with number', () => {
        const composedURL: string = composeUrl(['foo', 3, 'bar bar'], 'https://company.com/posthog/')
        expect(composedURL).toEqual('https://company.com/posthog/foo/3/bar%20bar/')
    })
    test('compose URL API 1', () => {
        const composedAPIURL: string = composeUrl(['api', 'hook'], 'https://app.posthog.com/')
        expect(composedAPIURL).toEqual('https://app.posthog.com/api/hook/')
    })
    test('compose URL API 2', () => {
        const composedAPIURL: string = composeUrl(['api', 'bar', 'foo'], 'https://company.com/posthog')
        expect(composedAPIURL).toEqual('https://company.com/posthog/api/bar/foo/')
    })
    test('compose URL API with query params', () => {
        const composedAPIURL: string = composeUrl(['api', 'bar', '?id=2&foo=bar'], 'https://posthog.company.com/')
        expect(composedAPIURL).toEqual('https://posthog.company.com/api/bar/?id=2&foo=bar')
    })
    test('compose URL API with protocolless host', () => {
        const composedAPIURL: string = composeUrl(['api', 'bar', '?id=2&foo=bar'], 'posthog.company.com/')
        expect(composedAPIURL).toEqual('https://posthog.company.com/api/bar/?id=2&foo=bar')
    })
    test('compose URL API with protocolful host', () => {
        const composedAPIURL: string = composeUrl(['api', 'bar', '?id=2&foo=bar'], 'http://posthog.company.com/')
        expect(composedAPIURL).toEqual('http://posthog.company.com/api/bar/?id=2&foo=bar')
    })
    test('compose URL API from bundle', () => {
        const composedAPIURL: string = composeUrl(['api', 'bar', '?id=2&foo=bar'], {
            authData: { apiHost: 'posthog.company.com' },
        } as unknown as Bundle)
        expect(composedAPIURL).toEqual('https://posthog.company.com/api/bar/?id=2&foo=bar')
    })
})
