const Book = require('../models/Book');

const postBook =  async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
 const getAllBooks =  async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, 'i');
  if (genre) filter.genre = new RegExp(genre, 'i');
  try {
    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: 'reviews',
      populate: { path: 'user', select: 'name' },
    });
    if (!book) return res.status(404).send('Book not found');

    const avgRating = book.reviews.reduce((acc, r) => acc + r.rating, 0) / (book.reviews.length || 1);
    res.json({ ...book.toObject(), averageRating: avgRating });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports ={postBook , getAllBooks , getBookById}