/* globals describe, expect, test */

import { Bundle, createAppTester, tools } from 'zapier-platform-core';

import App from '../index';

const appTester = createAppTester(App);
tools.env.inject();

/*
describe('action_performed', () => {
  test('list actions', async () => {
    const bundle = { inputData: {} };
    const results = (await appTester(
      App.triggers.action_performed.operation.perform,
      bundle
    )) as Array<object>;
    expect(results.length).toBeGreaterThan(0);
  });
});
*/
