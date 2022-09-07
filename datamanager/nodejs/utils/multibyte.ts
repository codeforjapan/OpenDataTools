/* eslint-disable no-control-regex */

const MULTIBYTE_EXP = /[^\x01-\x7E]+/;
const SINGLE_BYTE_EXP = /[\x01-\x7E]+/;

export const containMultibyte = (data: string): boolean => {
  const isMatch = data.match(MULTIBYTE_EXP);
  if (isMatch) return true;
  return false;
};

export const containSingleByte = (data: string): boolean => {
  const isMatch = data.match(SINGLE_BYTE_EXP);
  if (isMatch) return true;
  return false;
};
