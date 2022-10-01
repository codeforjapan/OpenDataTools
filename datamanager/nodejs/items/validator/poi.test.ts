import { ItemValidatorPoi } from './poi';

describe('items/validator/poi', () => {
  const poiValidator = new ItemValidatorPoi();

  test('POIかどうか', () => {
    expect(() => poiValidator.validateDataType('テスト')).toThrow('不正なPOIデータです。');
    expect(() => poiValidator.validateDataType('1000')).toThrow('不正なPOIデータです。');
    expect(() => poiValidator.validateDataType('0101')).not.toThrow('不正なPOIデータです。');
  });
});
