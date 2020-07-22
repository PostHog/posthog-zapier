/* globals describe, expect, test */

import { createAppTester, tools } from 'zapier-platform-core'

import App from '../index'

const appTester = createAppTester(App)
tools.env.inject()

describe('event_capture', () => {
    test('capture event', async () => {
        /*
    const bundle = { inputData: { title: 'hello', year: 2020 } };
    const result = await appTester(App.creates.action_performed.operation.perform, bundle);
    expect(result).toMatchObject({
      title: 'hello',
      year: 2020,
    });
    */
    })
})
