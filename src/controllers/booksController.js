// const mongoose = require("mongoose");
const booksModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const validator = require("../utils/validator");

/*------------------------------------------------------------------------------------------------------------------ 1. API - CREATE A BOOK. -------------------------------------------------------------------------------------*/
const createBook = async (req, res) => {
  try {
    console.log("createBook");

    const requestBody = req.body;

    // Error: No Data in Request-Body.
    if (Object.keys(requestBody).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Request. Please input data in the body.",
      });
    }

    const {
      title,
      excerpt,
      userId,
      ISBN,
      category,
      subcategory,
      reviews,
      isReleased,
    } = requestBody;

    //UserID Validation.
    if (!validator.isValidString(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid UserID." });
    }
    if (!validator.isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        message: "UserID NOT a Valid Mongoose ObjectId.",
      });
    }
    const isUserIdRegistered = await userModel.findById(userId);
    if (!isUserIdRegistered) {
      return res
        .status(400)
        .send({ status: false, message: "UserID NOT Found." });
    }

    //TITLE Validation.
    if (!validator.isValidString(title)) {
      return res.status(400).send({ status: false, message: "Invalid TITLE." });
    }
    const titleUnique = await booksModel.findOne({ title: title });
    if (titleUnique) {
      return res
        .status(400)
        .send({ status: false, message: "TITLE already Present." });
    }

    //EXCERPT Validation.
    if (!validator.isValidString(excerpt)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid EXCERPT." });
    }

    //ISBN Validation.
    // if (!validator.isValidString(ISBN)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Invalid ISBN." });
    // }
    if (!validator.isValidISBN(ISBN)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid ISBN: length 13 Digits ONLY.",
        });
    }
    const ISBNUnique = await booksModel.findOne({ ISBN: ISBN });
    if (ISBNUnique) {
      return res
        .status(400)
        .send({ status: false, message: "ISBN already Present." });
    }

    //CATEGORY Validation.
    if (!validator.isValidString(category)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid CATEGORY." });
    }
    if (!/^[a-zA-Z0-9\- ]*$/.test(category)) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "CATEGORY can ONLY be Alphabets, Hyphen(-), Numbers & White-space(s) ONLY.",
        });
    }

    //Subcategory Validation.
    const regex = /^[a-zA-Z\- ]*$/; //Regex Validation (Only Alphabets, White-Spaces and Hyphen(-)).

    //Subcategory(as STRING) Validations.
    if (req.body.subcategory) {
      if (typeof req.body.subcategory === "string") {
        if (!req.body.subcategory.trim().length) {
          return res
            .status(400)
            .send({ status: false, msg: "SUBCATEGORY can't be Empty." });
        }
        if (!regex.test(req.body.subcategory)) {
          return res
            .status(400)
            .send({
              status: false,
              msg: "SUBCATEGORY can be Alphabets, Hyphen(-) & White-space(s) ONLY.",
            });
        }
      }
      //Subcategory(as ARRAY) Validation.
      if (typeof req.body.subcategory === "object") {
        const x = req.body.subcategory.filter((x) => x.trim().length === 0);
        if (x.length) {
          return res
            .status(400)
            .send({ status: false, msg: "SUBCATEGORY can't be Empty." });
        }
        const y = req.body.subcategory.filter((x) => !regex.test(x));
        if (y.length) {
          return res
            .status(400)
            .send({
              status: false,
              msg: "SUBCATEGORY can be Alphabets, Hyphen(-) & White-space(s) ONLY.",
            });
        } else {
          let flag = 0;
          const subcat = req.body.subcategory;
          for (let i = 0; i < subcat.length - 1; i++) {
            for (let j = i + 1; j < subcat.length; j++) {
              if (subcat[i].toLowerCase() === subcat[j].toLowerCase()) {
                flag++;
              }
            }
          }
          if (flag) {
            return res.status(400).send({
              status: false,
              msg: "SUBCATEGORY can ONLY have UNIQUE values.",
            });
          }
        }
      }
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "SUBCATEGORY Missing in Body." });
    }
    //...........

    //REVIEWS Validation.
    // if (!validator.isNumber(reviews)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Invalid REVIEWS." });
    // }

    //Create Book Document.
    const bookData = await booksModel.create(requestBody);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: bookData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*------------------------------------------------------------------------------------------------------------------ 2. API - GET BOOKS. -------------------------------------------------------------------------------------*/
const getBooks = async (req, res) => {
  try {
    console.log("getBooks");

    const allBooks = await booksModel.find({ isDeleted: false }).select({ title:1, excerpt:1, userId:1, category:1, releasedAt:1, reviews:1 }).sort({ title:1 });



    return res
      .status(200)
      .send({ status: true, message: "Found All Books Successfully.", data: allBooks });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 3. API - GET BOOK BY ID. -------------------------------------------------------------------------------------*/
const getBookById = async (req, res) => {
  try {
    console.log("getBookById");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "getBookById" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 4. API - UPDATE BOOK BY ID. -------------------------------------------------------------------------------------*/
const updateBookById = async (req, res) => {
  try {
    console.log("updateBookById");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "updateBookById" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 5. API - DELETE BOOK BY ID. -------------------------------------------------------------------------------------*/
const deleteBookById = async (req, res) => {
  try {
    console.log("deleteBookById");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "deleteBookById" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
