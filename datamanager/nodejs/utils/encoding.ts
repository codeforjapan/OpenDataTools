import Encoding from 'encoding-japanese';

export const EncodingConverter = (
  data: ArrayBufferLike, to: Encoding.Encoding
): string => {
  const code = new Uint8Array(data);
  const originalEncoding = Encoding.detect(code) as Encoding.Encoding;
  const utf8Str: string = Encoding.convert(code, {
    to,
    from: originalEncoding,
    type: 'string'
  });
  return utf8Str;
};
