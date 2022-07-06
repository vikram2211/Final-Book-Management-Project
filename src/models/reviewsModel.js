const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewsSchema = new mongoose.Schema({
  bookId: {
    type: ObjectId,
    required: true,
    ref: "Book",
  },

  
  reviewedBy: {
    type: String,
    required: true,
    trim: true,
    default: "Guest",   // Reviewer's Name.
  },

  reviewedAt: {
    type: Date,
    required: true,
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

  review: {
    type: String,
    trim: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports.reviewsModel = mongoose.model("Review", reviewsSchema); //Collection Name- reviews.
