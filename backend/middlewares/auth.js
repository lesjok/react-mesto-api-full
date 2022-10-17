require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/notAuthError');

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(new NotAuthError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-code');
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  console.log(req.user);

  next();
};

module.exports = { auth };
