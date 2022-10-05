"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemValidatorPoi = void 0;
const fs_1 = __importDefault(require("fs"));
const sync_1 = require("csv-parse/sync");
class ItemValidatorPoi {
    static INT_EXP = /[^0-9]/;
    validateDataType(data) {
        if (typeof data != 'string') {
            throw new Error('POIコードは文字列である必要があります。');
        }
        if (data.length !== 4) {
            throw new Error('POIコードは4桁である必要があります。');
        }
        const matched = data.match(ItemValidatorPoi.INT_EXP);
        if (matched !== null) {
            throw new Error('POIコードは数値である必要があります。');
        }
        const csvData = (0, sync_1.parse)(fs_1.default.readFileSync(__dirname + '/data/poi.csv'));
        // 先頭行はヘッダーなので削除
        csvData.shift();
        const poiList = csvData.map((row) => row[1]);
        if (!poiList.includes(data)) {
            throw new Error('存在しないPOIコードです。');
        }
        return;
    }
}
exports.ItemValidatorPoi = ItemValidatorPoi;
