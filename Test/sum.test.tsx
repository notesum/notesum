import {expect, test} from '@jest/globals';

// tslint:disable-next-line:no-var-requires
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
