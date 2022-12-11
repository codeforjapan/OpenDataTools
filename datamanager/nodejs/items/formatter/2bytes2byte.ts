import { Moji } from '../../utils/multibyte';
import { SchemeFormatterItemLabel } from '../../scheme/formatters/item_label';

export class ItemFormatter2bytes2byte {
  labelFormatter = new SchemeFormatterItemLabel();
  formatTargetList = [
    'NO',
    '都道府県コード又は市区町村コード',
    'POIコード',
    '緯度',
    '経度',
    '電話番号',
    '内線番号',
    '法人番号',
    '開始時間',
    '終了時間',
    '名称_カナ',
  ];
  format = (items: { [header: string]: string }[]) =>
    items.map((item) => {
      const formatedData: { [header: string]: string } = {};
      for (const header of Object.keys(item)) {
        const isTarget = this.formatTargetList.includes(this.labelFormatter.format(header).collectedLabel);
        if (isTarget) {
          formatedData[header] = new Moji(item[header]).convert('kana', 'HtoZ').convert('alphanumeric', 'ZtoH').toString();
        } else {
          formatedData[header] = item[header];
        }
      }
      return formatedData;
    });
}
