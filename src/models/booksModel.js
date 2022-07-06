const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const booksSchema = new mongoose.Schema(
  {
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
      trim: true, //////
      ref: "User",
    },

    ISBN: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 13,
      maxlength: 13,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subcategory: {
      type: [String],     //BOTH: "string" & "array".
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
      default: "",    //null or "" ?
    },

    //// ASk if isReleased included? 
    isReleased: {
      type: Boolean,
      default: false,
    },

    releasedAt: {
      type: Date,
      required: true,
      default: new Date(),
      // new Date().toISOString().slice(0,10),
      // ('yyyy-MM-dd'),          
      //   format: "YYYY-MM-DD",
      match: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", booksSchema); //Collection Name- books.
