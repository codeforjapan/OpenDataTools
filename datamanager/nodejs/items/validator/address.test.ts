import { ItemValidatorAddress } from './address';

describe('items/validator/address', () => {
  const addressValidator = new ItemValidatorAddress();

  test('文字列かどうか', async () => {
    await expect(addressValidator.validateDataType(1000)).rejects.toEqual(
      new Error('住所は文字列である必要があります。'),
    );
    await expect(addressValidator.validateDataType(true)).rejects.toEqual(
      new Error('住所は文字列である必要があります。'),
    );
  });

  test('正しい住所がどうか', async () => {
    await expect(addressValidator.validateDataType('北')).rejects.toEqual(
      new Error(
        '住所が正しくありません。都道府県、市区町村と町丁目も入力してください（例：北→北海道札幌市西区24-2-2-3-3）。',
      ),
    );
    await expect(addressValidator.validateDataType('北海道')).rejects.toEqual(
      new Error(
        '住所が正しくありません。市区町村と町丁目も入力してください（例：北海道→北海道札幌市西区24-2-2-3-3）。',
      ),
    );
    await expect(addressValidator.validateDataType('北海道札幌市西区')).rejects.toEqual(
      new Error(
        '住所が正しくありません。町丁目も入力してください（例：北海道札幌市西区→北海道札幌市西区24-2-2-3-3）。',
      ),
    );
  });
});
