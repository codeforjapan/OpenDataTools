import {
  validateAddress,
  validateCityName,
  validateDayOfWeek,
  validateLatLng,
  validateNo,
  validatePoi,
  validateRegionCode,
  validateRegionName,
  validateTel,
  validateTime,
  validateUrl,
} from 'opendatatool-datamanager';

export const validatorFactory = (dataType: Dataset.DataType) => {
  switch (dataType) {
    case 'tel':
      return validateTel.validateDataType;
    case 'regioncode':
      return validateRegionCode.validateDataType;
    case 'regionname':
      return validateRegionName.validateDataType;
    case 'cityname':
      return validateCityName.validateDataType;
    case 'poi':
      return validatePoi.validateDataType;
    case 'day_of_week':
      return validateDayOfWeek.validateDataType;
    case 'no':
      return validateNo.validateDataType;
    case 'time':
      return validateTime.validateDataType;
    case 'lat':
      return validateLatLng.validateLat;
    case 'lng':
      return validateLatLng.validateLng;
    case 'url':
      return validateUrl.validateDataType;
    case 'address':
      return validateAddress.validateDataType;
    default:
      return () => {
        return;
      };
  }
};

export const label2DataType: (label: string) => Dataset.DataType = (label) => {
  switch (label) {
    case '都道府県コード又は市区町村コード':
      return 'regioncode';
    case '電話番号':
      return 'tel';
    case 'POIコード':
      return 'poi';
    case 'NO':
      return 'no';
    case '都道府県名':
      return 'regionname';
    case '市区町村名':
      return 'cityname';
    case '開始時間':
      return 'time';
    case '終了時間':
      return 'time';
    case '緯度':
      return 'lat';
    case '経度':
      return 'lng';
    case '利用可能曜日':
      return 'day_of_week';
    case 'URL':
      return 'url';
    case '住所':
      return 'address';
    default:
      return null;
  }
};
