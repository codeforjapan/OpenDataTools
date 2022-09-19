"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_japanese_1 = __importDefault(require("encoding-japanese"));
class Encoding {
    static convert(data, to) {
        const code = new Uint8Array(data);
        const originalEncoding = encoding_japanese_1.default.detect(code);
        const convertedArray = encoding_japanese_1.default.convert(code, {
            to,
            from: originalEncoding,
        });
        const array = new Uint8Array(convertedArray);
        return array;
    }
    static toString(data) {
        const code = new Uint8Array(data);
        const originalEncoding = encoding_japanese_1.default.detect(code);
        const decoder = new TextDecoder(originalEncoding);
        // const convertedArray = Encoding.convertEncoding(data, 'UNICODE');
        const string = decoder.decode(data);
        return string;
    }
}
exports.default = Encoding;
