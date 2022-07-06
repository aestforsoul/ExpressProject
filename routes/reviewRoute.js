const router = require("express").Router({ mergeParams: true });
const bookList = require("../model/data");

const checkIfReviewExists = (req, res, next) => {
  const reviewId = req.params.reviewId;
  const bookId = req.params.bookId;
  const review = bookList
    .find((book) => String(book.id) === bookId)
    .reviews.find((review) => String(review.id) === reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  req.review = review;
  next();
};

router.get("/", (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const reviews = bookList.find((book) => String(book.id) === bookId).reviews;
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:reviewId", checkIfReviewExists, (req, res, next) => {
  try {
    res.json(req.review);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const reviewComment = req.body.comment;
    const bookId = req.params.bookId;
    const reviews = bookList.find((book) => String(book.id) === bookId).reviews;
    const review = { id: reviews.length + 1, comment: reviewComment };
    bookList.find((book) => String(book.id) === bookId).reviews.push(review);

    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.delete("/:reviewId", checkIfReviewExists, (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const reviews = bookList.find((book) => String(book.id) === bookId).reviews;
        const index = reviews.indexOf(req.review);
        if (index > -1) {
        reviews.splice(index, 1); 
        }
        res.json(reviews);
    }  catch (error) {
        next(error);
    }
})

module.exports = router;
