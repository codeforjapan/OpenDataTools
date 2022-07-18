import EncodingConverter from './encoding';

const SJIS_BUFFER: Buffer = Buffer.from(
  [
    130, 177, 130, 204, 131, 101, 131, 76, 131, 88, 131, 103, 130, 205, 32,
    83, 74, 73, 83, 32, 130, 197, 143, 145, 130, 169, 130, 234, 130, 196,
    130, 162, 130, 220, 130, 183, 129, 66
  ]
);
const UTF8_ARRAY: number[] = [
  227, 129, 147, 227, 129, 174, 227, 131, 134,
  227, 130, 173, 227, 130, 185, 227, 131, 136,
  227, 129, 175, 32, 83, 74, 73, 83, 32,
  227, 129, 167, 230, 155, 184, 227, 129, 139,
  227, 130, 140, 227, 129, 166, 227, 129, 132,
  227, 129, 190, 227, 129, 153, 227, 128, 130
];
const UTF8_BUFFER: Buffer = Buffer.from(UTF8_ARRAY);
const UTF8_STR = 'ãã®ãã­ã¹ãã¯ SJIS ã§æ¸ããã¦ãã¾ãã';
const UNICODE_ARRAY: number[] = [
  12371, 12398, 12486, 12461, 12473, 12488, 12399,
  32, 83, 74, 73, 83, 32, 12391, 26360, 12363, 12428,
  12390, 12356, 12414, 12377, 12290
];
const UNICODE_BUFFER: Buffer = Buffer.from(UNICODE_ARRAY);
const UNICODE_STR = 'このテキストは SJIS で書かれています。';

describe('encoding converter', () => {
  test('convert Shift_JIS to UTF-8', () => {
    const convertedArray = EncodingConverter.asArray(SJIS_BUFFER, 'UTF8');
    expect(convertedArray).toEqual(UTF8_ARRAY);
    const convertedBuffer = EncodingConverter.asBuffer(SJIS_BUFFER, 'UTF8');
    expect(convertedBuffer).toEqual(UTF8_BUFFER);
    const convertedStr = EncodingConverter.asString(SJIS_BUFFER, 'UTF8');
    expect(convertedStr).toEqual(UTF8_STR);
  });
  test('convert UTF-8 to UNICODE', () => {
    const convertedArray = EncodingConverter.asArray(UTF8_BUFFER, 'UNICODE');
    expect(convertedArray).toEqual(UNICODE_ARRAY);
    const convertedBuffer = EncodingConverter.asBuffer(UTF8_BUFFER, 'UNICODE');
    expect(convertedBuffer).toEqual(UNICODE_BUFFER);
    const convertedStr = EncodingConverter.asString(UTF8_BUFFER, 'UNICODE');
    expect(convertedStr).toEqual(UNICODE_STR);
  });
});
