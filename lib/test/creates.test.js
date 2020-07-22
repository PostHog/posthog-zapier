"use strict";
/* globals describe, expect, test */
Object.defineProperty(exports, "__esModule", { value: true });
const zapier_platform_core_1 = require("zapier-platform-core");
const index_1 = require("../index");
const appTester = zapier_platform_core_1.createAppTester(index_1.default);
zapier_platform_core_1.tools.env.inject();
describe('movie', () => {
    test('create a movie', async () => {
        const bundle = { inputData: { title: 'hello', year: 2020 } };
        const result = await appTester(index_1.default.creates.movie.operation.perform, bundle);
        expect(result).toMatchObject({
            title: 'hello',
            year: 2020,
        });
    });
});
