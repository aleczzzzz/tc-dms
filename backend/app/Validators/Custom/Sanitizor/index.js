let Sanitizor = {};

Sanitizor.trim = (value) => `${value}`.trim();
Sanitizor.toInt = (value) => +value;
Sanitizor.toLower = (value) => `${value}`.toLowerCase();
Sanitizor.toUpper = (value) => `${value}`.toUpperCase();
Sanitizor.arrayToInt = (value) => value.map((val) => +val);
Sanitizor.arrayToString = (value) => value.map((val) => `${val}`);

module.exports = Sanitizor;
