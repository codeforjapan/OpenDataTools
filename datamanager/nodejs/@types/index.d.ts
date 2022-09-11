declare namespace Dataset {
  type category = 'public-facilities' | 'aed-location';
}

declare namespace Scheme {
  interface ItemList {
    id: string;
    label: string;
    class: 'required' | 'basic' | 'valuable';
    advanced: boolean;
  }
}
