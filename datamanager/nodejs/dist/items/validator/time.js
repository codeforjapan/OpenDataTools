'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const multibyte_1 = require('../../utils/multibyte');
class ItemValidatorTime {
  static INT_EXP = /[^0-9]/;
  validateDataType(data) {
    if (typeof data != 'string') {
      throw new Error('時間表記は文字列である必要があります。');
    }
    const isMultibyte = (0, multibyte_1.containMultibyte)(data);
    if (isMultibyte) {
      throw new Error('時間表記は半角である必要があります。');
    }
    const separated = data.split(':');
    if (separated.length !== 2) {
      throw new Error('時間表記はhh:mmである必要があります。');
    }
    if (separated[0].length !== 2 || separated[1].length !== 2) {
      throw new Error('時間表記はhh:mmである必要があります。');
    }
    const hourStr = separated[0];
    const hourMatched = hourStr.match(ItemValidatorTime.INT_EXP);
    if (hourMatched !== null) {
      throw new Error('時間が数値として認識されないか0以下の数値です。');
    }
    const minuteStr = separated[1];
    const minuteMatched = minuteStr.match(ItemValidatorTime.INT_EXP);
    if (minuteMatched !== null) {
      throw new Error('分が数値として認識されないか0以下の数値です。');
    }
    const minute = parseInt(minuteStr);
    if (minute > 59) {
      throw new Error('分は0~60の数値である必要があります。');
    }
    return;
  }
}
exports.default = ItemValidatorTime;
