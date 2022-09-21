class ItemValidatorTel {
  validateDataType(data: any) {
    if (typeof data != 'string') {
      throw new Error('電話番号は文字列である必要があります。');
    }

    const matchesDomesticPhoneFree = data.match(/^0(\d+-??)+\d+$/);
    const matchesDomesticPhone = data.match(/^\(0\d+\)(\d+-??)+\d+$/);
    const matchesInternationalPhone = data.match(/^\+[1-9]\d*\s\([1-9]\d*\)(\d+-??)+\d+$/);
    const matchesNumber = data.match(/\d+/g);

    if (!matchesDomesticPhoneFree && !matchesDomesticPhone && !matchesInternationalPhone) {
      throw new Error(
        '電話番号は国内電話の場合は市外局番から始まり、国際電話の場合は「+国番号」から始まる必要があります。セパレータには半角ハイフン「-」を使用します。',
      );
    }

    if (matchesNumber && (matchesNumber.length < 10 || matchesNumber.length > 15)) {
      throw new Error('電話番号の数字は10桁以上15桁以内である必要があります。');
    }
    return;
  }
}

export default ItemValidatorTel;
