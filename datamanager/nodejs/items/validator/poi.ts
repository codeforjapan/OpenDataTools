import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class ItemValidatorPoi {
  validateDataType(data: any) {
    const csvData = parse(fs.readFileSync(__dirname + '/data/poi.csv'));
    // 先頭行はヘッダーなので削除
    csvData.shift();
    const poiList = csvData.map((row: any) => row[1]);
    if (!poiList.includes(data)) {
      throw new Error('不正なPOIデータです。');
    }

    return;
  }
}
