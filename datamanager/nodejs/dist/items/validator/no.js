'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ItemValidatorNo = void 0;
class ItemValidatorNo {
  static INT_EXP = /[^0-9]/;
  validateDataType(data) {
    if (typeof data != 'string') {
      throw new Error('NOコードは文字列である必要があります。');
    }
    if (data.length !== 10) {
      throw new Error('NOコードは10桁である必要があります。10桁未満の場合、10桁になるように先頭を0で埋めてください。');
    }
    const matched = data.match(ItemValidatorNo.INT_EXP);
    if (matched !== null) {
      throw new Error('NOコードは数値である必要があります。');
    }
    return;
  }
}
exports.ItemValidatorNo = ItemValidatorNo;
