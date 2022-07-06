const mongoose = require("mongoose");

const isValidString = function (value) {
  if (typeof value === 'undefined' || value === null) return false;
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
  return value === 13;
};

const isValidRating = function (value) {
  return (value) => 1 && value <= 5;
};

const isNumber = function (value) {
  return isNan(value);
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
};
