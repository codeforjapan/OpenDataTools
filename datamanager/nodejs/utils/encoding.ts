import Encoding from 'encoding-japanese';

export default class EncodingConverter {
  private static convert(data: Buffer, to: Encoding.Encoding): number[] {
    const code = new Uint8Array(data);
    const originalEncoding = Encoding.detect(code) as Encoding.Encoding;
    const convertedArray: number[] = Encoding.convert(code, {
      to,
      from: originalEncoding,
    });
    return convertedArray;
  }
  public static asArray(data: Buffer, to: Encoding.Encoding): number[] {
    const array = EncodingConverter.convert(data, to);
    return array;
  }
  public static asString(data: Buffer, to: Encoding.Encoding): string {
    const array = EncodingConverter.convert(data, to);
    const string = Encoding.codeToString(array);
    return string;
  }
  public static asBuffer(data: Buffer, to: Encoding.Encoding): Buffer {
    const array = EncodingConverter.convert(data, to);
    const buffer = Buffer.from(array);
    return buffer;
  }
};
