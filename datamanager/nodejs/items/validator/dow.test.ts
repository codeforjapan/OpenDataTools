import { ItemValidatorDow } from './dow';

describe('items/validator/dow', () => {
  const dowValidator = new ItemValidatorDow();

  test('文字列かどうか', () => {
    expect(() => dowValidator.validateDataType(1000)).toThrow('利用可能曜日は文字列である必要があります。');
    expect(() => dowValidator.validateDataType(true)).toThrow('利用可能曜日は文字列である必要があります。');
  });

  test('利用可能曜日が正しいかどうか', () => {
    expect(() => dowValidator.validateDataType('1000')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字以外の文字が使われています（例：月火水木金土日）。',
    );
    expect(() => dowValidator.validateDataType('月・水・金')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字以外の文字が使われています（例：月火水木金土日）。',
    );
    expect(() => dowValidator.validateDataType('月 水 金')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字以外の文字が使われています（例：月火水木金土日）。',
    );
    expect(() => dowValidator.validateDataType('月水目')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字以外の文字が使われています（例：月火水木金土日）。',
    );
    expect(() => dowValidator.validateDataType('日月火')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を正しく並べてください（例：月火水木金土日）。',
    );
    expect(() => dowValidator.validateDataType('水月金')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を正しく並べてください（例：月火水木金土日）。',
    );

    const wrapper = (arg: string) => {
      try {
        dowValidator.validateDataType(arg);
      } catch {
        throw new Error('An error has been occurred');
      }
      return true;
    };
    expect(wrapper('日')).toBe(true);
    expect(wrapper('月水金')).toBe(true);
  });
});
