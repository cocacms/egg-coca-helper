'use strict';
let language = {};

exports.setLanguage = lg => (language = lg);
exports.getLanguage = () => language;
