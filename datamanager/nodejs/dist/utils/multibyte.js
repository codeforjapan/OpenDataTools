"use strict";
/* eslint-disable no-control-regex */
Object.defineProperty(exports, "__esModule", { value: true });
exports.containSingleByte = exports.containMultibyte = void 0;
const MULTIBYTE_EXP = /[^\x01-\x7E]+/;
const SINGLE_BYTE_EXP = /[\x01-\x7E]+/;
const containMultibyte = (data) => {
    const isMatch = data.match(MULTIBYTE_EXP);
    if (isMatch)
        return true;
    return false;
};
exports.containMultibyte = containMultibyte;
const containSingleByte = (data) => {
    const isMatch = data.match(SINGLE_BYTE_EXP);
    if (isMatch)
        return true;
    return false;
};
exports.containSingleByte = containSingleByte;
