const router = require("express").Router();
const reviews = require("./reviewRoute");
const bookList = require("../model/data");

const checkIfBookExists = (req, res, next) => {
  const bookId = req.params.bookId;
  const book = bookList.find((book) => String(book.id) === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  req.book = book;
  next();
};

router.get("/", (req, res, next) => {
  try {
    res.json(bookList);
  } catch (error) {
    next(error);
  }
});

router.get("/:bookId", checkIfBookExists, (req, res, next) => {
  try {
    res.json(req.book);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
    try {
      const bookTitle = req.body.title;
      const reviewsList = req.body.reviews;
      const book = { id: bookList.length + 1, title: bookTitle, reviews: reviewsList || []};
  
      bookList.push(book);
  
      res.json(book);
    } catch (error) {
      next(error);
    }
  });

router.patch("/:bookId", checkIfBookExists, (req, res, next) => {
    try {
        const bookTitle = req.body.title;
        req.book.title = bookTitle;
        res.json(req.book);
    } catch (error) {
      next(error);
    }
})

router.use("/:bookId/review", reviews);

module.exports = router;
