"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemValidatorUrl = void 0;
class ItemValidatorUrl {
    validateDataType(data) {
        if (typeof data != 'string') {
            throw new Error('URLは文字列である必要があります。');
        }
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const unused = new URL(data);
        }
        catch {
            throw new Error('入力がURLとして認識されません。');
        }
        return;
    }
}
exports.ItemValidatorUrl = ItemValidatorUrl;
