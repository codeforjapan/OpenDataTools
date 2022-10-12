'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SchemeValidater = void 0;
const items_list_1 = require('./constants/items-list');
class SchemeValidater {
  allItemsList = {
    'public-facilities': items_list_1.PUBLIC_FACILITIES_ITEMS_LIST,
    'aed-location': items_list_1.AED_LOCATION_ITEMS_LIST,
  };
  getMissingItems(params) {
    const itemsList = this.allItemsList[params.category];
    const missingItems = itemsList.filter((item) => !params.current_items.includes(item.label));
    return missingItems;
  }
}
exports.SchemeValidater = SchemeValidater;
