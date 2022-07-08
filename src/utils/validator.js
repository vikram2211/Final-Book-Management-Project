const mongoose = require("mongoose");

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidTitle = function (value) {
  return ["Mr", "Mrs", "Miss"].indexOf(value) !== -1;
};

const isValidObjectId = function (value) {
  return mongoose.Types.ObjectId.isValid(value);
};

const isValidPassword = function (value) {
  return value.length >= 8 && value.length <= 15;
};

const isValidRequestBody = function (value) {
  return Object.keys(value).length > 0;
};

const isValidISBN = function (value) {
  return /^\d{13}$/.test(value);
};

const isValidRating = function (value) {
  // return (value) => 1 && value <= 5;
  return /^[1-5]$/.test(value);
};

const isNumber = function (value) {
  return isNan(value);
};

const isValidReview = function (value) {
  if (typeof value !== "string" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidDate = function (value) {
  return /((20)[0-9]{2}[-](0[13578]|1[02])[-](0[1-9]|[12][0-9]|3[01]))|((20)[0-9]{2}[-](0[469]|11)[-](0[1-9]|[12][0-9]|30))|((20)[0-9]{2}[-](02)[-](0[1-9]|1[0-9]|2[0-8]))|((((20)(04|08|[2468][048]|[13579][26]))|2000)[-](02)[-]29)/g.test(value);
};

module.exports = {
  isValidString,
  isValidISBN,
  isValidObjectId,
  isValidPassword,
  isValidTitle,
  isValidRequestBody,
  isValidRating,
  isNumber,
  isValidReview,
  isValidDate,
};
