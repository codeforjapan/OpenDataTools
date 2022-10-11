import { ItemValidatorRegname } from './regname';

describe('items/validator/regcode', () => {
  const regnameValidator = new ItemValidatorRegname();

  test('文字列かどうか', () => {
    expect(() => regnameValidator.validateDataType(1000)).toThrow('都道府県名は文字列である必要があります。');
    expect(() => regnameValidator.validateDataType(true)).toThrow('都道府県名は文字列である必要があります。');
  });

  test('正しい都道府県名がどうか', () => {
    expect(() => regnameValidator.validateDataType('神奈川')).toThrow(
      '都道府県名が正しくありません。正式名称で記入してください（例：東京→東京都）。',
    );
    expect(() => regnameValidator.validateDataType('')).toThrow(
      '都道府県名が正しくありません。正式名称で記入してください（例：東京→東京都）。',
    );
    const wrapper = (arg: string) => {
      try {
        regnameValidator.validateDataType(arg);
      } catch {
        throw new Error('An error has been occurred');
      }
      return true;
    };
    expect(wrapper('北海道')).toBe(true);
  });
});
