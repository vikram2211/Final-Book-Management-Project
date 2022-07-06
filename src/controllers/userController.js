const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const validator = require("../utils/validator");

/*---------------------------------------------------------------------------------------------------------- 1. API - CREATE A USER. -------------------------------------------------------------------------------------*/
const createUser = async (req, res) => {
  try {
    console.log("createUser");
    console.log(validator.isValidString("checkValidator"));

    return res
      .status(201)
      .send({ status: true, message: "Success", data: "createUser" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 2. API - lOGIN USER. -------------------------------------------------------------------------------------*/

const userLogin = async (req, res) => {
  try {
    console.log("userLogin");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "userLogin" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createUser,
  userLogin,
};
