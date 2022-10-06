'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const regcode_1 = require('./regcode');
describe('items/validator/regcode', () => {
  const regcodeValidator = new regcode_1.ItemValidatorRegcode();
  test('文字列かどうか', () => {
    expect(() => regcodeValidator.validateDataType(1000)).toThrow(
      '都道府県・市区町村コードは文字列である必要があります。',
    );
    expect(() => regcodeValidator.validateDataType(true)).toThrow(
      '都道府県・市区町村コードは文字列である必要があります。',
    );
  });
  test('6桁かどうか', () => {
    expect(() => regcodeValidator.validateDataType('adfdsff')).toThrow(
      '都道府県・市区町村コードは6桁である必要があります。',
    );
    expect(() => regcodeValidator.validateDataType('')).toThrow('都道府県・市区町村コードは6桁である必要があります。');
  });
  test('数値に変換可能かどうか', () => {
    expect(() => regcodeValidator.validateDataType('0xd345')).toThrow(
      '都道府県・市区町村コードは数値である必要があります。',
    );
    expect(() => regcodeValidator.validateDataType('１２３４５６')).toThrow(
      '都道府県・市区町村コードは数値である必要があります。',
    );
  });
  test('範囲内の数値かどうか', () => {
    expect(() => regcodeValidator.validateDataType('010000')).toThrow(
      '都道府県・市区町村コードの数値が範囲を超えています。',
    );
    expect(() => regcodeValidator.validateDataType('509932')).toThrow(
      '都道府県・市区町村コードの数値が範囲を超えています。',
    );
  });
});
