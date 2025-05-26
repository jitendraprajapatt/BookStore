const express = require('express');
const bookRouter = express.Router();
const { getAllBooks, postBook, getBookById } = require('../controllers/book');
const auth = require('../middleware/auth');
// Routes
bookRouter.post('/new/book',auth,postBook);    
bookRouter.get('/books', getAllBooks);   
bookRouter.get('/books/:id', getBookById); 

module.exports = bookRouter; 
