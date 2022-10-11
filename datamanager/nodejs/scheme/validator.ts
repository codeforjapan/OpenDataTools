import { AED_LOCATION_ITEMS_LIST, PUBLIC_FACILITIES_ITEMS_LIST } from './constants/items-list';

export class SchemeValidater {
  allItemsList: { [key in Dataset.category]: Scheme.ItemList[] } = {
    'public-facilities': PUBLIC_FACILITIES_ITEMS_LIST,
    'aed-location': AED_LOCATION_ITEMS_LIST,
  };
  getMissingItems(params: { current_items: string[]; category: Dataset.category }) {
    const itemsList = this.allItemsList[params.category];
    const missingItems = itemsList.filter((item) => !params.current_items.includes(item.label));
    return missingItems;
  }
}
