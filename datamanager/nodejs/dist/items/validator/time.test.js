"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = __importDefault(require("./time"));
describe('items/validator/time', () => {
    const timeValidator = new time_1.default();
    test('文字列かどうか', () => {
        expect(() => timeValidator.validateDataType(1000)).toThrow('時間表記は文字列である必要があります。');
        expect(() => timeValidator.validateDataType(true)).toThrow('時間表記は文字列である必要があります。');
    });
    test('半角文字かどうか', () => {
        expect(() => timeValidator.validateDataType('２０:００')).toThrow('時間表記は半角である必要があります。');
        expect(() => timeValidator.validateDataType('20：00')).toThrow('時間表記は半角である必要があります。');
    });
    test('hh:mmの表記になっているかどうか', () => {
        expect(() => timeValidator.validateDataType('6:00')).toThrow('時間表記はhh:mmである必要があります。');
        expect(() => timeValidator.validateDataType('16:0')).toThrow('時間表記はhh:mmである必要があります。');
    });
    test('hhが正しい形式か', () => {
        expect(() => timeValidator.validateDataType('e6:00')).toThrow('時間が数値として認識されないか0以下の数値です。');
        expect(() => timeValidator.validateDataType('-4:00')).toThrow('時間が数値として認識されないか0以下の数値です。');
    });
    test('mmが正しい形式か', () => {
        expect(() => timeValidator.validateDataType('06:0f')).toThrow('分が数値として認識されないか0以下の数値です。');
        expect(() => timeValidator.validateDataType('00:66')).toThrow('分は0~60の数値である必要があります。');
        expect(() => timeValidator.validateDataType('00:-8')).toThrow('分が数値として認識されないか0以下の数値です。');
    });
});
