const Book = require('../models/Book');

 const searchBook =  async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {searchBook}