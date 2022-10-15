import { ItemValidatorDow } from './dow';

describe('items/validator/dow', () => {
  const dowValidator = new ItemValidatorDow();

  test('文字列かどうか', () => {
    expect(() => dowValidator.validateDataType(1000)).toThrow('利用可能曜日は文字列である必要があります。');
    expect(() => dowValidator.validateDataType(true)).toThrow('利用可能曜日は文字列である必要があります。');
  });

  test('利用可能曜日が正しいかどうか', () => {
    expect(() => dowValidator.validateDataType('日')).not.toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を並べて指定してください（例：火水木金土日）。'
    );
    expect(() => dowValidator.validateDataType('月水金')).not.toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を並べて指定してください（例：火水木金土日）。'
    );
    expect(() => dowValidator.validateDataType('1000')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を並べて指定してください（例：火水木金土日）。'
    );
    expect(() => dowValidator.validateDataType('月・水・金')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を並べて指定してください（例：火水木金土日）。'
    );
    expect(() => dowValidator.validateDataType('月 水 金')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を並べて指定してください（例：火水木金土日）。'
    );
    expect(() => dowValidator.validateDataType('目月火')).toThrow(
      '利用可能曜日が正しくありません。曜日の漢字を並べて指定してください（例：火水木金土日）。'
    );
  });
});
