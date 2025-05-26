const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRouter  = require('./routers/authRouter');
const bookRouter = require('./routers/bookRouter');
const reviewRouter = require('./routers/reviewRouter');
const searchRouter = require('./routers/searchRouter');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.use('/api', authRouter);
app.use('/api', bookRouter);
app.use('/api', reviewRouter);
app.use('/api', searchRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
