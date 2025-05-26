const express = require('express');
const { searchBook } = require('../controllers/search');
const searchRouter = express.Router();


searchRouter.get('/', searchBook);

module.exports = searchRouter; 