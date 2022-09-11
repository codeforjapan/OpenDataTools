import { ItemValidatorUrl } from './url';

describe('items/validator/url', () => {
  const urlValidator = new ItemValidatorUrl();

  test('半角文字かどうか', () => {
    expect(() => urlValidator.validateDataType(1000)).toThrow('URLは文字列である必要があります。');
    expect(() => urlValidator.validateDataType(true)).toThrow('URLは文字列である必要があります。');
  });

  test('有効なURLかどうか', () => {
    expect(() => urlValidator.validateDataType('https//google.com')).toThrow('入力がURLとして認識されません。');
    expect(() => urlValidator.validateDataType('google．com')).toThrow('入力がURLとして認識されません。');
  });
});
