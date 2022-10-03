import { SchemeFormatterItemLabel } from './scheme/formatters/item_label';
import { ItemValidatorLatLng } from './items/validator/latlng';
import { ItemValidatorUrl } from './items/validator/url';
import { Encoding } from './utils/encoding';
import { PUBLIC_FACILITIES_ITEMS_LIST } from './scheme/constants/items-list';
import { RECOMMEND_BASIC_DATASET_LIST } from './scheme/constants/dataset';

const itemLabelFormatter = new SchemeFormatterItemLabel();
const validateUrl = new ItemValidatorUrl();
const validateLatLng = new ItemValidatorLatLng();
const utilCharEncoding = new Encoding();
const itemsListOfPublicFacilities = PUBLIC_FACILITIES_ITEMS_LIST;
const datasetListOfRecommendBasic = RECOMMEND_BASIC_DATASET_LIST;

export {
  itemLabelFormatter,
  validateUrl,
  validateLatLng,
  utilCharEncoding,
  itemsListOfPublicFacilities,
  datasetListOfRecommendBasic,
};
