import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class ItemValidatorPoi {
  static INT_EXP = /[^0-9]/;
  validateDataType(data: any) {
    if (typeof data != 'string') {
      throw new Error('POIコードは文字列である必要があります。');
    }

    if (data.length !== 4) {
      throw new Error('POIコードは4桁である必要があります。');
    }

    const matched = data.match(ItemValidatorPoi.INT_EXP);
    if (matched !== null) {
      throw new Error('POIコードは数値である必要があります。');
    }

    const csvData = parse(fs.readFileSync(__dirname + '/data/poi.csv'));
    // 先頭行はヘッダーなので削除
    csvData.shift();
    const poiList = csvData.map((row: any) => row[1]);
    if (!poiList.includes(data)) {
      throw new Error('正しくないPOIコードです。');
    }
    return;
  }
}
