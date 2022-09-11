import { ItemValidatorLatLng } from './items/validator/latlng';
import { ItemValidatorUrl } from './items/validator/url';

const validateUrl = new ItemValidatorUrl();
const validateLatLng = new ItemValidatorLatLng();

export { validateUrl, validateLatLng };
