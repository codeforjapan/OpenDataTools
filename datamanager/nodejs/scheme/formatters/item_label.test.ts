import { SchemeFormatterItemLabel } from './item_label';

describe('scheme/formatters/item_label', () => {
  const itemLabelFormatter = new SchemeFormatterItemLabel();

  test('input collect item label', () => {
    const result = itemLabelFormatter.format('住所');
    expect(result.success).toBe(true);
    expect(result.recommend).toBe(false);
    expect(result.collectedLabel).toBe('住所');
  });

  test('input white listed item label', () => {
    const result = itemLabelFormatter.format('所在地');
    expect(result.success).toBe(true);
    expect(result.recommend).toBe(true);
    expect(result.collectedLabel).toBe('住所');
  });

  test('input wrong item label', () => {
    const result = itemLabelFormatter.format('場所');
    expect(result.success).toBe(false);
    expect(result.recommend).toBe(false);
    expect(result.collectedLabel).toBe('場所');
  });
});
