const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const booksSchema = new mongoose.Schema(
  {
    bookCover:{
      type: String,
   
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: ObjectId,
      required: true,
      trim: true,
      ref: "User",
    },

    ISBN: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // minlength: 13,
      // maxlength: 13,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subcategory: {
      type: [String],   
      required: true,
      trim: true,
    },

    reviews: {
      type: Number,
      required: true,
      trim: true,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,   
    },

    releasedAt: {
      type: Date,
      required: true,
      // match: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", booksSchema); //Collection Name- books.
