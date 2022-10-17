import { poiList } from './poiList';

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

    if (!poiList.includes(data)) {
      throw new Error('存在しないPOIコードです。');
    }
    return;
  }
}
