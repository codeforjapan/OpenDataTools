import { containMultibyte } from '../../utils/multibyte';

class ItemValidatorTime {
  validateDataType(data: any) {
    if (typeof data != 'string') {
      throw new Error('時間表記は文字列である必要があります。');
    }

    const isMultibyte = containMultibyte(data);
    if (isMultibyte) {
      throw new Error('時間表記は半角である必要があります。');
    }

    const separated = data.split(':');
    if (separated.length !== 2) {
      throw new Error('時間表記はhh:mmである必要があります。');
    }

    const hour = parseInt(separated[0]);
    if (isNaN(hour)) {
      throw new Error('時間が数値として認識されません。');
    }
    // 25時などの表記を考慮して上限は設定しない
    if (hour < 0) {
      throw new Error('時間は0以上の数値である必要があります。');
    }

    const minute = parseInt(separated[1]);
    if (isNaN(minute)) {
      throw new Error('分が数値として認識されません。');
    }
    if (minute < 0 || minute > 59) {
      throw new Error('分は0~60の数値である必要があります。');
    }

    return;
  }
}

export default ItemValidatorTime;
