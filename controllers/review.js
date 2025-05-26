const Review = require('../models/Review');
const Book = require('../models/Book');


const postReview = async (req, res) => {
  try {
    const existing = await Review.findOne({ book: req.params.bookId, user: req.user.id });
    if (existing) return res.status(400).send('Review already exists');

    const review = new Review({ ...req.body, user: req.user.id, book: req.params.bookId });
    await review.save();
    await Book.findByIdAndUpdate(req.params.bookId, { $push: { reviews: review._id } });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const putReview = async (req, res) => {
  try {
    console.log(req.params.reviewId)
    const review = await Review.findById(req.params.reviewId);
    if (!review || review.user.toString() !== req.user.id) return res.status(403).send('Unauthorized');
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteReview =  async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review || review.user.toString() !== req.user.id) return res.status(403).send('Unauthorized');
    await review.remove();
    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
    res.send('Review deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {postReview, putReview ,deleteReview}