import { SchemeFormatterItemLabel } from './scheme/formatters/item_label';
import { ItemValidatorTel } from './items/validator/tel';
import { ItemValidatorLatLng } from './items/validator/latlng';
import { ItemValidatorUrl } from './items/validator/url';
import { Encoding } from './utils/encoding';
import { PUBLIC_FACILITIES_ITEMS_LIST } from './scheme/constants/items-list';
import { RECOMMEND_BASIC_DATASET_LIST } from './scheme/constants/dataset';
import { ItemValidatorRegcode } from './items/validator/regcode';
import { SchemeValidater } from './scheme/validator';
import { ItemValidatorCityname } from './items/validator/cityname';
import { ItemValidatorDow } from './items/validator/dow';
import { ItemValidatorNo } from './items/validator/no';
import { ItemValidatorPoi } from './items/validator/poi';
import { ItemValidatorRegname } from './items/validator/regname';
import { ItemValidatorTime } from './items/validator/time';
import { ItemFormatter2bytes2byte } from './items/formatter/2bytes2byte';
import { ItemValidatorAddress } from './items/validator/address';

const schemeValidator = new SchemeValidater();
const itemLabelFormatter = new SchemeFormatterItemLabel();
const item2bytes2byteFormatter = new ItemFormatter2bytes2byte();
const validateRegionCode = new ItemValidatorRegcode();
const validateTel = new ItemValidatorTel();
const validateUrl = new ItemValidatorUrl();
const validateLatLng = new ItemValidatorLatLng();
const validateCityName = new ItemValidatorCityname();
const validateDayOfWeek = new ItemValidatorDow();
const validateNo = new ItemValidatorNo();
const validatePoi = new ItemValidatorPoi();
const validateRegionName = new ItemValidatorRegname();
const validateTime = new ItemValidatorTime();
const validateAddress = new ItemValidatorAddress();
const utilCharEncoding = new Encoding();
const itemsListOfPublicFacilities = PUBLIC_FACILITIES_ITEMS_LIST;
const datasetListOfRecommendBasic = RECOMMEND_BASIC_DATASET_LIST;

export {
  schemeValidator,
  itemLabelFormatter,
  item2bytes2byteFormatter,
  validateRegionCode,
  validateTel,
  validateUrl,
  validateLatLng,
  validateCityName,
  validateDayOfWeek,
  validateNo,
  validatePoi,
  validateRegionName,
  validateTime,
  validateAddress,
  utilCharEncoding,
  itemsListOfPublicFacilities,
  datasetListOfRecommendBasic,
};
