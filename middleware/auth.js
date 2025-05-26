const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

  const authHeader = req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  // 2. Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }


    req.user = decoded.user;
    next();
  });
};

module.exports = auth; 