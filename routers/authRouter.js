const express = require('express');
const authRouter = express.Router();
const { signUp, login } = require('../controllers/auth');

authRouter.post('/signup', signUp);
authRouter.post('/login', login);

// Export the router directly (not as an object)
module.exports = authRouter;