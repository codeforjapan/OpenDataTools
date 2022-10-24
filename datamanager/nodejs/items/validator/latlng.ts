export class ItemValidatorLatLng {
  validateDataType(data: any) {
    if (typeof data !== 'string') {
      throw new Error('緯度、経度は文字列である必要があります。');
    }

    const [beforeDecimal, afterDecimal] = data.split('.');
    if (
      !beforeDecimal ||
      !afterDecimal ||
      beforeDecimal.match(/[^0-9-]+/) ||
      afterDecimal.match(/[^0-9-]+/) ||
      afterDecimal.length != 6
    ) {
      throw new Error('緯度、経度は10進数、小数点以下6桁である必要があります。');
    }
    return;
  }
  validateLat = (data: any) => {
    this.validateDataType(data);
    const numberedData = Number(data);
    if (numberedData <= 20 || numberedData >= 46) {
      throw new Error('緯度が日本の範囲から外れている可能性があります。');
    }
    return;
  };
  validateLng = (data: any) => {
    this.validateDataType(data);
    const numberedData = Number(data);
    if (numberedData <= 122 || numberedData >= 154) {
      throw new Error('経度が日本の範囲から外れている可能性があります。');
    }
    return;
  };
}
