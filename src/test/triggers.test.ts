/* globals describe, expect, test */

import { Bundle, createAppTester, tools } from 'zapier-platform-core'

import App from '../index'
import { getFallbackRealActionPerformance } from '../triggers/action_performed'
import * as eventsQuery from './__mocks__/query.json'
import * as restWebhook from './__mocks__/rest_webhook.json'

const appTester = createAppTester(App)
tools.env.inject()

describe('action_performed', () => {
    test('list actions', async () => {
        /*const bundle = { inputData: {} };
    const results = (await appTester(
      App.triggers.action_performed.operation.perform,
      bundle
    )) as Array<object>;
    expect(results.length).toBeGreaterThan(0);
    */
    })
})

describe('getFallbackRealActionPerformance', () => {
    test('stitches together event query response to match actual webhook', async () => {
        const z = { request: () => ({ data: eventsQuery }) }

        const result = await getFallbackRealActionPerformance(
            z as any,
            {
                inputData: { project_id: 21, action_id: 42 },
            } as any
        )

        const should = restWebhook.data
        const actual = result[0]
        expect(actual.eventUuid).toEqual(should.eventUuid)
        expect(actual.properties).toEqual(should.properties)
        expect(actual.person.properties.email).toEqual(should.person.properties.email)
        expect(actual.elementsList[0].text).toEqual(should.elementsList[0].text)
    })
})
