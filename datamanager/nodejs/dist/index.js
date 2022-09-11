"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLatLng = exports.validateUrl = void 0;
const latlng_1 = require("./items/validator/latlng");
const url_1 = require("./items/validator/url");
const validateUrl = new url_1.ItemValidatorUrl();
exports.validateUrl = validateUrl;
const validateLatLng = new latlng_1.ItemValidatorLatLng();
exports.validateLatLng = validateLatLng;
