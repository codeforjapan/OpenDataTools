"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multibyte_1 = require("./multibyte");
describe('utils/multibyte', () => {
    test('全角文字を含むか', () => {
        const test1 = (0, multibyte_1.containMultibyte)('sdfあee0０');
        expect(test1).toBe(true);
        const test2 = (0, multibyte_1.containMultibyte)('漢字のテスト');
        expect(test2).toBe(true);
        const test3 = (0, multibyte_1.containMultibyte)('No Multibyte');
        expect(test3).toBe(false);
    });
    test('半角文字を含むか', () => {
        const test1 = (0, multibyte_1.containSingleByte)('It does contain single-byte chars');
        expect(test1).toBe(true);
        const test2 = (0, multibyte_1.containSingleByte)('半角文字なし');
        expect(test2).toBe(false);
        const test3 = (0, multibyte_1.containSingleByte)('０２ー１１ー23');
        expect(test3).toBe(true);
    });
});
