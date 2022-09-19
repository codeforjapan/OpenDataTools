import ItemValidatorTel from './tel';

describe('items/validator/tel', () => {
  const telValidator = new ItemValidatorTel();

  test('半角文字かどうか', () => {
    expect(() => telValidator.validateDataType(1000)).toThrow(
      '電話番号は文字列である必要があります。'
    );
    expect(() => telValidator.validateDataType(true)).toThrow(
      '電話番号は文字列である必要があります。'
    );
  });

  test('国内電話または国際電話かどうか、セパレータは半角ハイフンか', () => {
    expect(() => telValidator.validateDataType('999-9999-9999')).toThrow(
      '電話番号は国内電話の場合は市外局番から始まり、国際電話の場合は「+国番号」から始まる必要があります。セパレータには半角ハイフン「-」を使用します。'
    );
    expect(() => telValidator.validateDataType('999+9999-9999')).toThrow(
      '電話番号は国内電話の場合は市外局番から始まり、国際電話の場合は「+国番号」から始まる必要があります。セパレータには半角ハイフン「-」を使用します。'
    );
    expect(() => telValidator.validateDataType('(999)9999-9999')).toThrow(
      '電話番号は国内電話の場合は市外局番から始まり、国際電話の場合は「+国番号」から始まる必要があります。セパレータには半角ハイフン「-」を使用します。'
    );
    expect(() => telValidator.validateDataType('+999-9999-9999')).toThrow(
      '電話番号は国内電話の場合は市外局番から始まり、国際電話の場合は「+国番号」から始まる必要があります。セパレータには半角ハイフン「-」を使用します。'
    );
    expect(() => telValidator.validateDataType('+999 (099)9999-9999')).toThrow(
      '電話番号は国内電話の場合は市外局番から始まり、国際電話の場合は「+国番号」から始まる必要があります。セパレータには半角ハイフン「-」を使用します。'
    );
  });

  test('数字は10桁以上15桁以内かどうか', () => {
    expect(() => telValidator.validateDataType('(09)999-99')).toThrow(
      '電話番号の数字は10桁以上15桁以内である必要があります。'
    );
    expect(() => telValidator.validateDataType('09999-9999-9999-9999')).toThrow(
      '電話番号の数字は10桁以上15桁以内である必要があります。'
    );
  });
});
