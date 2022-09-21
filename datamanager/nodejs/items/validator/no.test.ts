import { ItemValidatorNo } from './no';

describe('items/validator/url', () => {
  const noValidator = new ItemValidatorNo();

  test('文字列かどうか', () => {
    expect(() => noValidator.validateDataType(1000)).toThrow('NOコードは文字列である必要があります。');
    expect(() => noValidator.validateDataType(true)).toThrow('NOコードは文字列である必要があります。');
  });

  test('10桁かどうか', () => {
    expect(() => noValidator.validateDataType('000302133322')).toThrow('NOコードは10桁である必要があります。');
    expect(() => noValidator.validateDataType('')).toThrow('NOコードは10桁である必要があります。');
  });

  test('数値かどうか', () => {
    expect(() => noValidator.validateDataType('0xdddf3a75')).toThrow('NOコードは数値である必要があります。');
  });
});
