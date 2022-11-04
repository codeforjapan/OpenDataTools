export class ItemValidatorBarrierFreeInfo {
  validateDataType(data: any) {
    if (typeof data !== 'string') {
      throw new Error('バリアフリー情報は文字列である必要があります。');
    }
    return;
  }
}
