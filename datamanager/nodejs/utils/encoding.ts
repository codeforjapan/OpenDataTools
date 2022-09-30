import EncodingJapanese from 'encoding-japanese';

export class Encoding {
  convert(data: Buffer, to: EncodingJapanese.Encoding): Uint8Array {
    const code = new Uint8Array(data);
    const originalEncoding = EncodingJapanese.detect(code) as EncodingJapanese.Encoding;
    const convertedArray: number[] = EncodingJapanese.convert(code, {
      to,
      from: originalEncoding,
    });
    const array = new Uint8Array(convertedArray);
    return array;
  }
  toString(data: Buffer): string {
    const code = new Uint8Array(data);
    const originalEncoding = EncodingJapanese.detect(code) as EncodingJapanese.Encoding;
    const decoder = new TextDecoder(originalEncoding);
    // const convertedArray = Encoding.convertEncoding(data, 'UNICODE');
    const string = decoder.decode(data);
    return string;
  }
}
