const express = require('express');
const auth = require('../middleware/auth');
const { deleteReview, putReview, postReview } = require('../controllers/review');
const reviewRouter = express.Router();


reviewRouter.post('/books/:bookId/reviews', auth, postReview);


reviewRouter.put('/reviews/:reviewId', auth, putReview);


reviewRouter.delete('/reviews/:reviewId', auth, deleteReview);


module.exports = reviewRouter;