export class ItemValidatorDow {
  validateDataType(data: any) {
    if (typeof data !== 'string') {
      throw new Error('利用可能曜日は文字列である必要があります。');
    }
    const matched = data.match(/^[月火水木金土日]+$/);
    if (!matched) {
      throw new Error('利用可能曜日が正しくありません。曜日の漢字以外の文字が使われています（例：月火水木金土日）。');
    }
    const orderMatched = data.match(/^月?火?水?木?金?土?日?$/);
    if (!orderMatched) {
      throw new Error('利用可能曜日が正しくありません。曜日の漢字を正しく並べてください（例：月火水木金土日）。');
    }
    return;
  }
}
