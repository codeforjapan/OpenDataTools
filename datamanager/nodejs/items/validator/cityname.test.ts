import { ItemValidatorCityname } from './cityname';

describe('items/validator/cityname', () => {
  const citynameValidator = new ItemValidatorCityname();

  test('文字列かどうか', () => {
    expect(() => citynameValidator.validateDataType(1000)).toThrow('市区町村名は文字列である必要があります。');
    expect(() => citynameValidator.validateDataType(true)).toThrow('市区町村名は文字列である必要があります。');
  });

  test('正しい市区町村名がどうか', () => {
    expect(() => citynameValidator.validateDataType('札幌市')).not.toThrow(
      '市区町村名が正しくありません。正式名称で記入してください（例：札幌→札幌市）。',
    );
    expect(() => citynameValidator.validateDataType('札幌')).toThrow(
      '市区町村名が正しくありません。正式名称で記入してください（例：札幌→札幌市）。',
    );
    expect(() => citynameValidator.validateDataType('札幌市中央区')).toThrow(
      '市区町村名が正しくありません。正式名称で記入してください（例：札幌→札幌市）。',
    );
  });
});
