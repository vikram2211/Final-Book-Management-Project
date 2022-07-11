const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      enum: ["Mr", "Mrs", "Miss"],
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[6-9]\d{9}$/, //Start with <6,7,8,9> & 10-Digits.
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Format!");
        }
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 15,
    },

    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      pincode: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); //Collection Name- users.
