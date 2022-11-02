import { normalize } from '@geolonia/normalize-japanese-addresses';

export class ItemValidatorAddress {
  async validateDataType(data: any) {
    if (typeof data !== 'string') {
      throw new Error('住所は文字列である必要があります。');
    }

    const result = await normalize(data);

    switch (result.level) {
    case 0:
      throw new Error('住所が正しくありません。都道府県、市区町村と町丁目も入力してください（例：北→北海道札幌市西区24-2-2-3-3）。');
    case 1:
      throw new Error('住所が正しくありません。市区町村と町丁目も入力してください（例：北海道→北海道札幌市西区24-2-2-3-3）。');
    case 2:
      throw new Error('住所が正しくありません。町丁目も入力してください（例：北海道札幌市西区→北海道札幌市西区24-2-2-3-3）。');
    default:
      break;
    }

    return;
  }
}
