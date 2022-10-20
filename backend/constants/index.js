const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://react-mesto.nomoredomains.icu',
  'https://react-mesto.nomoredomains.icu',
  'react-mesto.nomoredomains.icu',
];

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
