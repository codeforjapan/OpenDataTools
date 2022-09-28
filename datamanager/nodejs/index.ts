import { ItemValidatorLatLng } from './items/validator/latlng';
import { ItemValidatorUrl } from './items/validator/url';
import { PUBLIC_FACILITIES_ITEMS_LIST } from './scheme/constants/items-list';
import { RECOMMEND_BASIC_DATASET_LIST } from './scheme/constants/dataset';

const validateUrl = new ItemValidatorUrl();
const validateLatLng = new ItemValidatorLatLng();
const itemsListOfPublicFacitities = PUBLIC_FACILITIES_ITEMS_LIST;
const datasetListOfRecommendBasic = RECOMMEND_BASIC_DATASET_LIST;

export { validateUrl, validateLatLng, itemsListOfPublicFacitities, datasetListOfRecommendBasic };
