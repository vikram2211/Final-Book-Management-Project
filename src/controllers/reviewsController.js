const mongoose = require("mongoose");
const reviewsModel = require("../models/reviewsModel");
const validator = require("../utils/validator");



/*------------------------------------------------------------------------------------------------------------ 1. API - CREATE A REVIEW BY BOOK-ID. ------------------------------------------------------------------------------------*/
const createReview = async (req, res) => {
  try {
    console.log("createReview");
    return res
      .status(201)
      .send({ status: true, message: "Success", data: "createReview" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



/*---------------------------------------------------------------------------------------------------------- 2. API - UPDATE A REVIEW OF BOOK BY REVIEW-ID. -------------------------------------------------------------------------------------*/

const updateReview = async (req, res) => {
  try {
    console.log("updateReview");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "updateReview" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



/*---------------------------------------------------------------------------------------------------------- 3. API - DELETE A REVIEW OF BOOK BY REVIEW-ID. -------------------------------------------------------------------------------------*/

const deleteReviewById = async (req, res) => {
  try {
    console.log("deleteReviewById");
    return res
      .status(200)
      .send({ status: true, message: "Success", data: "deleteReviewById" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReviewById,
};
