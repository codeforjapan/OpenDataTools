'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ItemValidatorRegcode = void 0;
class ItemValidatorRegcode {
  static INT_EXP = /[^0-9]/;
  // MIN_CODE, MAX_CODEの定数は2022/09/21時点の総務省資料（以下）を参考に指定
  // https://www.soumu.go.jp/denshijiti/code.html
  static MIN_CODE = 10006; // 北海道
  static MAX_CODE = 473821; // 沖縄県与那国町
  validateDataType(data) {
    if (typeof data != 'string') {
      throw new Error('都道府県・市区町村コードは文字列である必要があります。');
    }
    if (data.length !== 6) {
      throw new Error('都道府県・市区町村コードは6桁である必要があります。');
    }
    // 数値かどうかを調べる際parseInt()でのチェックは'e0'など文字列を含む場合も許容してしまうため正規表現で処理する
    const matched = data.match(ItemValidatorRegcode.INT_EXP);
    if (matched !== null) {
      throw new Error('都道府県・市区町村コードは数値である必要があります。');
    }
    const dataInt = parseInt(data);
    if (dataInt < ItemValidatorRegcode.MIN_CODE || dataInt > ItemValidatorRegcode.MAX_CODE) {
      throw new Error('都道府県・市区町村コードの数値が範囲を超えています。');
    }
    return;
  }
}
exports.ItemValidatorRegcode = ItemValidatorRegcode;
