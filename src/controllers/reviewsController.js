// const mongoose = require("mongoose");
const reviewsModel = require("../models/reviewsModel");
const booksModel = require("../models/booksModel");
const validator = require("../utils/validator");



/*------------------------------------------------------------------------------------------------------------ 1. API - CREATE A REVIEW BY BOOK-ID. ------------------------------------------------------------------------------------*/
const createReview = async (req, res) => {
  try {
    console.log("createReview");

    const bookId = req.params.bookId;
    if(!bookId) {
      return res
      .status(400)
      .send({ status: false, message: "BookId NOT given in Params." });
    }
    if (!validator.isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: "BookID NOT a Valid Mongoose ObjectId.",
      });
    }

    const book = await booksModel.findOne({ _id: bookId, isDeleted:false });
    if(!book)  {
      return res
        .status(400)
        .send({ status: false, message: "Book NOT Found." });
    }

    let requestBody = req.body;
     // Error: No Data in Request-Body.
     if (Object.keys(requestBody).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Request. Please input data in the body.",
      });
    }

    const { reviewedBy, review, rating  } = requestBody ;


     //ReviewedBy Validation.
     if (!validator.isValidString(reviewedBy)) {
      return res.status(400).send({ status: false, message: "Invalid ReviewedBy." });
    }
    if(!/^[a-zA-Z ]*$/.test(reviewedBy)) {
      return res.status(400).send({ status: false, message: "ReviewedBy (NAME) can ONLY be Alphabets & White-space(s)." });
    }

    //RATING Validation.
    if (!validator.isValidRating(rating)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid RATING: NUMBER between 1 to 5 ONLY.",
        });
    }

    //REVIEW (Optional) Validation.
    if (!validator.isValidReview(review)) {
      return res.status(400).send({ status: false, message: "Invalid REVIEW." });
    }

    //Increase Review-Count in Book's Document.
    const incReviewsCount = await booksModel.findOneAndUpdate({ _id: bookId },{ $inc: { reviews:1 } }, { new: true } );

    requestBody.bookId =  bookId ;

    //Create Review.
    const reviewCreated = await reviewsModel.create(requestBody);

    return res
      .status(201)
      .send({ status: true, message: "Success", data: reviewCreated });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



/*---------------------------------------------------------------------------------------------------------- 2. API - UPDATE A REVIEW OF BOOK BY REVIEW-ID. -------------------------------------------------------------------------------------*/

const updateReview = async (req, res) => {
  try {
    console.log("updateReview");

    const bookId = req.params.bookId;
    if(!bookId) {
      return res
      .status(400)
      .send({ status: false, message: "BookID NOT given in Params." });
    }
    if (!validator.isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: "BookID NOT a Valid Mongoose ObjectId.",
      });
    }

    const reviewId = req.params.reviewId;
    if(!reviewId) {
      return res
      .status(400)
      .send({ status: false, message: "BookId NOT given in Params." });
    }
    if (!validator.isValidObjectId(reviewId)) {
      return res.status(400).send({
        status: false,
        message: "BookID NOT a Valid Mongoose ObjectId.",
      });
    }

    const book = await booksModel.findOne({ _id: bookId, isDeleted:false });
    if(!book)  {
      return res
        .status(400)
        .send({ status: false, message: "Book NOT Found." });
    }

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
