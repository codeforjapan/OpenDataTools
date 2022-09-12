import Encoding from './encoding';

const SJIS_BUFFER: Buffer = Buffer.from([
  130, 177, 130, 204, 131, 101, 131, 76, 131, 88, 131, 103, 130, 205, 32, 83, 74, 73, 83, 32, 130, 197, 143, 145, 130,
  169, 130, 234, 130, 196, 130, 162, 130, 220, 130, 183, 129, 66,
]);
const UTF8_ARRAY = new Uint8Array([
  227, 129, 147, 227, 129, 174, 227, 131, 134, 227, 130, 173, 227, 130, 185, 227, 131, 136, 227, 129, 175, 32, 83, 74,
  73, 83, 32, 227, 129, 167, 230, 155, 184, 227, 129, 139, 227, 130, 140, 227, 129, 166, 227, 129, 132, 227, 129, 190,
  227, 129, 153, 227, 128, 130,
]);

describe('encoding converter', () => {
  test('convert Shift_JIS to UTF-8', () => {
    const array = Encoding.convert(SJIS_BUFFER, 'UTF8');
    expect(array).toEqual(UTF8_ARRAY);
    const string = Encoding.toString(SJIS_BUFFER);
    expect(string).toBe('このテキストは SJIS で書かれています。');
  });
});
