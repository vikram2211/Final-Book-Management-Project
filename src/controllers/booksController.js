const mongoose = require("mongoose");
const booksModel = require("../models/booksModel");
const validator = require("../utils/validator");

/*------------------------------------------------------------------------------------------------------------------ 1. API - CREATE A BOOK. -------------------------------------------------------------------------------------*/
const createBook = async (req, res) => {
  try {
    console.log("createBook");
    return res
      .status(201)
      .send({ status: true, message: "Success", data: "createBook" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*------------------------------------------------------------------------------------------------------------------ 2. API - GET BOOKS. -------------------------------------------------------------------------------------*/
const getBooks = async (req, res) => {
  try {
    console.log("getBooks");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "getBooks" });
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
