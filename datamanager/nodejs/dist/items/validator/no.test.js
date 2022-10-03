"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const no_1 = require("./no");
describe('items/validator/url', () => {
    const noValidator = new no_1.ItemValidatorNo();
    test('文字列かどうか', () => {
        expect(() => noValidator.validateDataType(1000)).toThrow('NOコードは文字列である必要があります。');
        expect(() => noValidator.validateDataType(true)).toThrow('NOコードは文字列である必要があります。');
    });
    test('10桁かどうか', () => {
        expect(() => noValidator.validateDataType('000302133322')).toThrow('NOコードは10桁である必要があります。10桁未満の場合、10桁になるように先頭を0で埋めてください。');
        expect(() => noValidator.validateDataType('')).toThrow('NOコードは10桁である必要があります。10桁未満の場合、10桁になるように先頭を0で埋めてください。');
    });
    test('数値かどうか', () => {
        expect(() => noValidator.validateDataType('0xdddf3a75')).toThrow('NOコードは数値である必要があります。');
    });
});
