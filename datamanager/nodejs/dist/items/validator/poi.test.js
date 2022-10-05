"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poi_1 = require("./poi");
describe('items/validator/poi', () => {
    const poiValidator = new poi_1.ItemValidatorPoi();
    test('文字列かどうか', () => {
        expect(() => poiValidator.validateDataType(1000)).toThrow('POIコードは文字列である必要があります。');
        expect(() => poiValidator.validateDataType(true)).toThrow('POIコードは文字列である必要があります。');
    });
    test('4桁かどうか', () => {
        expect(() => poiValidator.validateDataType('01010')).toThrow('POIコードは4桁である必要があります。');
        expect(() => poiValidator.validateDataType('')).toThrow('POIコードは4桁である必要があります。');
    });
    test('数値かどうか', () => {
        expect(() => poiValidator.validateDataType('abcd')).toThrow('POIコードは数値である必要があります。');
    });
    test('正しいPOIコードかどうか', () => {
        expect(() => poiValidator.validateDataType('0101')).not.toThrow('存在しないPOIコードです。');
        expect(() => poiValidator.validateDataType('1000')).toThrow('存在しないPOIコードです。');
    });
});
