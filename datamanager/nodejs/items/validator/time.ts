import { containMultibyte } from "../../utils/multibyte";

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
      throw new Error('時間表記はhh:mmである必要があります');
    }

    const hour = parseInt(separated[0]);
    if (hour === NaN) {
      throw new Error('時間は');
    }
    return;
  }
}

export default ItemValidatorTime;
