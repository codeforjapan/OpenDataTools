import { ItemFormatter2bytes2byte } from './2bytes2byte';

describe('items/formatter/2bytes2byte', () => {
  const formatter = new ItemFormatter2bytes2byte();

  test('全角数字が変換されているか', () => {
    const data = [
      {
        都道府県コード又は市区町村コード: '１２３４５６',
        名称_カナ: 'ﾃｽﾄ',
        電話番号: '１２３－１２３',
        緯度: '１２３．１２',
        開始時間: '１２：００',
      },
    ];
    const formatedData = formatter.format(data);
    expect(formatedData.map((d) => d.都道府県コード又は市区町村コード).includes('123456')).toBe(true);
    expect(formatedData.map((d) => d.名称_カナ).includes('テスト')).toBe(true);
    expect(formatedData.map((d) => d.電話番号).includes('123-123')).toBe(true);
    expect(formatedData.map((d) => d.緯度).includes('123.12')).toBe(true);
    expect(formatedData.map((d) => d.開始時間).includes('12:00')).toBe(true);
  });

  test('ラベルのホワイトリストに入っているものが変換されているか', () => {
    const data = [
      {
        '都道府県コ-ド又は市区町村コ-ド': '１２３４５６',
        名前_カナ: 'ﾃｽﾄ',
        電話: '１２３－１２３',
        緯度経度: '１２３．１２',
        開始時刻: '１２：００',
      },
    ];
    const formatedData = formatter.format(data);
    expect(formatedData.map((d) => d['都道府県コ-ド又は市区町村コ-ド']).includes('123456')).toBe(true);
    expect(formatedData.map((d) => d.名前_カナ).includes('テスト')).toBe(true);
    expect(formatedData.map((d) => d.電話).includes('123-123')).toBe(true);
    expect(formatedData.map((d) => d.緯度経度).includes('123.12')).toBe(true);
    expect(formatedData.map((d) => d.開始時刻).includes('12:00')).toBe(true);
  });

  test('ターゲットリストに入っているものは変換されないか', () => {
    const data = [{ URL: 'https://１２３４５' }];
    const formatedData = formatter.format(data);
    expect(formatedData.map((d) => d.URL).includes('https://１２３４５')).toBe(true);
  });
});
