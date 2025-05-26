const express = require('express');
const bookRouter = express.Router();
const { getAllBooks, postBook, getBookById } = require('../controllers/book');

// Routes
bookRouter.post('/new/book', postBook);    
bookRouter.get('/books', getAllBooks);   
bookRouter.get('/books/:id', getBookById); 

module.exports = bookRouter; 