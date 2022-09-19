export class SchemeFormatterItemLabel {
  labelList: { [key: string]: { collectValue: string; whiteList: string[] } } = {
    codeOfPrefectureSection: {
      collectValue: '都道府県コード又は市区町村コード',
      whiteList: ['都道府県コード', '市区町村コード'],
    },
    no: { collectValue: 'NO', whiteList: ['no', 'No', 'NO.', 'no.'] },
    prefecture: { collectValue: '都道府県名', whiteList: ['都道府県'] },
    city: { collectValue: '市区町村名', whiteList: ['市区町村'] },
    name: { collectValue: '名称', whiteList: ['名前'] },
    nameKana: { collectValue: '名称_カナ', whiteList: ['名前_カナ'] },
    nameAlias: { collectValue: '名称_通称', whiteList: ['名前_通称'] },
    poiCode: { collectValue: 'POIコード', whiteList: ['POI'] },
    address: { collectValue: '住所', whiteList: ['所在地'] },
    addressAdditional: { collectValue: '方書', whiteList: ['方書'] },
    latitude: { collectValue: '緯度', whiteList: ['緯度経度', '緯度・経度', '緯度/経度'] },
    longitude: { collectValue: '経度', whiteList: ['緯度経度', '緯度・経度', '緯度/経度'] },
    phone: { collectValue: '電話番号', whiteList: ['電話'] },
    phoneExtension: { collectValue: '内線番号', whiteList: ['内線'] },
    companyNumber: { collectValue: '法人番号', whiteList: ['法人NO'] },
    organizationName: { collectValue: '団体名', whiteList: ['団体名'] },
    availableDayOfWeekName: { collectValue: '利用可能曜日', whiteList: ['利用可能日'] },
    openTime: { collectValue: '開始時間', whiteList: ['開始時刻'] },
    closeTime: { collectValue: '終了時間', whiteList: ['終了時刻'] },
    availableDateTimeAdditional: { collectValue: '利用可能日時特記事項', whiteList: ['特記事項'] },
    description: { collectValue: '説明', whiteList: [''] },
    barrierFreeInformation: { collectValue: 'バリアフリー情報', whiteList: ['バリアフリー'] },
    urk: { collectValue: 'URL', whiteList: ['url'] },
    other: { collectValue: '備考', whiteList: ['補足'] },
  };
  format(inputLabel: string) {
    const formattedResult = { success: false, recommend: false, collectedLabel: inputLabel };

    for (const label of Object.keys(this.labelList)) {
      const labelObject = this.labelList[label];
      if (labelObject.collectValue === inputLabel) {
        formattedResult.success = true;
        formattedResult.recommend = false;
        break;
      } else if (labelObject.whiteList.includes(inputLabel)) {
        formattedResult.success = true;
        formattedResult.recommend = true;
        formattedResult.collectedLabel = labelObject.collectValue;
        break;
      }
    }

    return formattedResult;
  }
}
