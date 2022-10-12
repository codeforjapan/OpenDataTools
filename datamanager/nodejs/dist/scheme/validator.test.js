'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const validator_1 = require('./validator');
describe('scheme validator', () => {
  const schemeValidater = new validator_1.SchemeValidater();
  test('find missing items for public facilities', () => {
    const missingItems = schemeValidater.getMissingItems({
      current_items: ['方書', '都道府県コード又は市区町村コード', '名称'],
      category: 'public-facilities',
    });
    expect(missingItems.length).toBe(21);
  });
});
