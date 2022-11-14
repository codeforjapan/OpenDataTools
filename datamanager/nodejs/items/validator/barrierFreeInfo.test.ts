import { ItemValidatorBarrierFreeInfo } from './barrierFreeInfo';

describe('items/validator/barrierFreeInfo', () => {
  const barrierFreeInfoValidator = new ItemValidatorBarrierFreeInfo();

  test('文字列かどうか', () => {
    expect(() => barrierFreeInfoValidator.validateDataType(1000)).toThrow(
      'バリアフリー情報は文字列である必要があります。',
    );
    expect(() => barrierFreeInfoValidator.validateDataType(true)).toThrow(
      'バリアフリー情報は文字列である必要があります。',
    );
  });
});
