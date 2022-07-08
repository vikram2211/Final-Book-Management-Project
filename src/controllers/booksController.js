// const mongoose = require("mongoose");
const booksModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const validator = require("../utils/validator");
const reviewsModel = require("../models/reviewsModel");

/*------------------------------------------------------------------------------------------------------------------ 1. API - CREATE A BOOK. -------------------------------------------------------------------------------------*/
const createBook = async (req, res) => {
  try {
    const requestBody = req.body;

    // Error: No Data in Request-Body.
    if (Object.keys(requestBody).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Request. Please input requestBody in the body.",
      });
    }

    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      requestBody;

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
      return res.status(400).send({
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
      return res.status(400).send({
        status: false,
        message:
          "CATEGORY can ONLY be Alphabets, Hyphen(-), Numbers & White-space(s) ONLY.",
      });
    }

    //Subcategory Validation.
    const regex = /^[a-zA-Z\- ]*$/; //Regex Validation (Only Alphabets, White-Spaces and Hyphen(-)).

    //Subcategory(as STRING) Validations.
    if (subcategory) {
      if (typeof subcategory === "string") {
        if (!subcategory.trim().length) {
          return res
            .status(400)
            .send({ status: false, msg: "SUBCATEGORY can't be Empty." });
        }
        if (!regex.test(subcategory)) {
          return res.status(400).send({
            status: false,
            msg: "SUBCATEGORY can be Alphabets, Hyphen(-) & White-space(s) ONLY.",
          });
        }
      }
      //Subcategory(as ARRAY) Validation.
      if (typeof subcategory === "object") {
        const x = subcategory.filter((x) => x.trim().length === 0);
        if (x.length) {
          return res
            .status(400)
            .send({ status: false, msg: "SUBCATEGORY can't be Empty." });
        }
        const y = subcategory.filter((x) => !regex.test(x));
        if (y.length) {
          return res.status(400).send({
            status: false,
            msg: "SUBCATEGORY can be Alphabets, Hyphen(-) & White-space(s) ONLY.",
          });
        } else {
          let flag = 0;
          const subcat = subcategory;
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

    //releasedAt Validation.
    if (!validator.isValidString(releasedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid ReleasedAt." });
    }
    // if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(releasedAt)) {
    if (!validator.isValidDate(releasedAt)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Format: ReleasedAt can ONLY be (YYYY-MM-DD).",
      });
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
      .send({ status: true, message: "Success", requestBody: bookData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*------------------------------------------------------------------------------------------------------------------ 2. API - GET BOOKS. -------------------------------------------------------------------------------------*/
const getBooks = async (req, res) => {
  try {
    // console.log(req.body);

    const { userId, category, subcategory } = req.query;

    if (Object.keys(req.query).length === 0) {
      //Find All the Books in Database.
      const allBooks = await booksModel
        .find()
        .select({
          title: 1,
          excerpt: 1,
          userId: 1,
          category: 1,
          releasedAt: 1,
          reviews: 1,
        })
        .sort({ title: 1 });

      return res.status(200).send({
        status: true,
        message: "Found All Books in Database Successfully.",
        requestBody: allBooks,
      });
    }
    //UserID Validation.
    if (userId) {
      if (!validator.isValidObjectId(userId)) {
        return res.status(400).send({
          status: false,
          message: "UserID NOT a Valid Mongoose ObjectId.",
        });
      }
    }

    let filter = {};
    filter.isDeleted = false;

    if (userId && category && subcategory) {
      filter = { userId, category, subcategory };
    } else if (userId && category) {
      filter = { userId, category };
    } else if (userId && subcategory) {
      filter = { userId, subcategory };
    } else if (category && subcategory) {
      filter = { category, subcategory };
    } else if (category && subcategory) {
      filter = { category, subcategory };
    } else if (category || subcategory || userId) {
      if (category) filter = { category };
      else if (subcategory) filter = { subcategory };
      else if (userId) filter = { userId };
    } else {
      return res.status(400).send({
        status: false,
        message:
          "Invalid Query: Enter  <userId>, <category> OR <subcategory>. ",
      });
    }
    //Find Books with <filter>.
    const allBooks = await booksModel
      .find(filter)
      .select({
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        releasedAt: 1,
        reviews: 1,
      })
      .sort({ title: 1 });

    //Error: NO Books Found.
    if (!allBooks.length) {
      return res
        .status(404)
        .send({ status: false, message: "NO Books Found." });
    }

    return res.status(200).send({
      status: true,
      message: "Found All Books according to Queries, Successfully.",
      requestBody: allBooks,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 3. API - GET BOOK BY ID. -------------------------------------------------------------------------------------*/
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // if (!bookId) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "BookId NOT given in Params." });
    // }
    if (!validator.isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: "BookID NOT a Valid Mongoose ObjectId.",
      });
    }

    //Find all Reviews for <bookId>.
    const reviewsFound = await reviewsModel
      .find({ bookId: bookId })
      .select({ __v: 0, isDeleted: 0 });

    //Find Book by <bookId>.
    let bookFound = await booksModel
      .findOne({ _id: bookId, isDeleted: false })
      .select({ __v: 0, deletedAt: 0 });
    if (!bookFound) {
      return res
        .status(404)
        .send({ status: false, message: "Book NOT Found." });
    }

    //Object Destructuring.
    const finalData = { ...bookFound.toObject(), reviewsData: reviewsFound };

    return res.status(200).send({
      status: true,
      message: "Book Found Successfully.",
      requestBody: finalData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 4. API - UPDATE BOOK BY ID. -------------------------------------------------------------------------------------*/
const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "BookId NOT Provided." });

    if (!validator.isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: "BookID NOT a Valid Mongoose ObjectId.",
      });
    }

    //Find Book by <bookId>.
    let searchBook = await booksModel.findOne({
      _id: bookId,
      isDeleted: false,
    });
    if (!searchBook)
      return res.status(404).send({
        status: false,
        message: `Book does not exist by this <${bookId}>.`,
      });

    const requestBody = req.body;
    // Error: No Data in Request-Body.
    if (Object.keys(requestBody).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Request. Please input requestBody in the body.",
      });
    }

    const { title, excerpt, ISBN, releasedAt } = requestBody;

    if (!(title || excerpt || ISBN || releasedAt)) {
      return res.status(400).json({
        status: false,
        message:
          "Invalid Request: Please input atleast one of < title, excerpt, ISBN OR releasedAt> in the requestBody.",
      });
    }

    //TITLE Validation.
    if (title) {
      if (!validator.isValidString(title)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid TITLE." });
      }
    }

    //EXCERPT Validation.
    if (excerpt) {
      if (!validator.isValidString(excerpt)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid EXCERPT." });
      }
    }

    //ISBN Validation.
    if (ISBN) {
      if (!validator.isValidISBN(ISBN)) {
        return res.status(400).send({
          status: false,
          message: "Invalid ISBN: length 13 Digits ONLY.",
        });
      }
    }

    //releasedAt Validation.
    if (releasedAt) {
      if (!validator.isValidString(releasedAt)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid ReleasedAt." });
      }
      // REGEX.
      if (!validator.isValidDate(releasedAt)) {
        return res.status(400).send({
          status: false,
          message: "Invalid Format: ReleasedAt can ONLY be (YYYY-MM-DD).",
        });
      }
    }

    //Different checkUnique...............
    if (
      requestBody.hasOwnProperty("title") ||
      requestBody.hasOwnProperty("ISBN")
    ) {
      let checkTitleAndIsbn = await booksModel.findOne({
        $or: [{ title: requestBody.title }, { ISBN: requestBody.ISBN }],
      });
      if (checkTitleAndIsbn)
        return res
          .status(400)
          .send({ status: false, message: "<Title> or <ISBN> already exist." });
    }

    let changeDetails = await booksModel.findOneAndUpdate(
      { _id: bookId },
      {
        title: requestBody.title,
        excerpt: requestBody.excerpt,
        releasedAt: requestBody.releasedAt,
        ISBN: requestBody.ISBN,
      },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: "Successfully updated book details.",
      requestBody: changeDetails,
    });
  } catch (err) {
    return res.status(500).send({ status: false, Error: err.message });
  }
};

/*-------------------------------------------------------------------------------------------------------------- 5. API - DELETE BOOK BY ID. -------------------------------------------------------------------------------------*/
const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!validator.isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: "BookID NOT a Valid Mongoose ObjectId.",
      });
    }

    //Find Book by <bookId>.
    let bookDeleted = await booksModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    if (!bookDeleted) {
      return res
        .status(404)
        .send({ status: false, message: "Book NOT Found." });
    }

    return res.status(200).send({
      status: true,
      message: "Deleted Book Successfully.",
      requestBody: bookDeleted,
    });
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
