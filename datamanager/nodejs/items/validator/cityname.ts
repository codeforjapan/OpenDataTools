import { citynameList } from './citynameList';

export class ItemValidatorCityname {
  validateDataType(data: any) {
    if (typeof data !== 'string') {
      throw new Error('市区町村名は文字列である必要があります。');
    }
    const matched = citynameList.includes(data);
    if (!matched) {
      throw new Error('市区町村名が正しくありません。正式名称で記入してください（例：札幌→札幌市）。');
    }
    return;
  }
}
