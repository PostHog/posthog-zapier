"use strict";
/* globals describe, expect, test */
Object.defineProperty(exports, "__esModule", { value: true });
const zapier_platform_core_1 = require("zapier-platform-core");
const index_1 = require("../index");
const appTester = zapier_platform_core_1.createAppTester(index_1.default);
zapier_platform_core_1.tools.env.inject();
describe('movie', () => {
    test('list movies', async () => {
        const bundle = { inputData: {} };
        const results = (await appTester(index_1.default.triggers.movie.operation.perform, bundle));
        expect(results.length).toBeGreaterThan(0);
        const firstMovie = results[0];
        expect(firstMovie).toMatchObject({
            id: '1',
            title: 'title 1',
        });
    });
});
