const express = require("express");
const router = express.Router();

const midW = require("../middlewares/auth");
const booksController = require("../controllers/booksController");
const reviewsController = require("../controllers/reviewsController");
const userController = require("../controllers/userController");

//User APIs.
router.post("/register", userController.createUser);

router.post("/login", userController.userLogin);

//Books APIs.
router.post("/books", midW.auth, booksController.createBook);

router.get("/books", midW.auth, booksController.getBooks);

router.get("/books/:bookId", midW.auth, booksController.getBookById);

router.put("/books/:bookId", midW.auth, booksController.updateBookById);

router.delete("/books/:bookId", midW.auth, booksController.deleteBookById);

//Reviews APIs.
router.post("/books/:bookId/review", reviewsController.createReview);

router.put("/books/:bookId/review/:reviewId", reviewsController.updateReview);

router.delete(
  "/books/:bookId/review/:reviewId",
  reviewsController.deleteReviewById
);

module.exports = router;
