import {expect, test} from '@jest/globals';

// tslint:disable-next-line:no-var-requires
const sum = require('./sum');

test('Always true 1=2=3', () => {
    expect(sum(1, 2)).toBe(3);
});
