const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://1137637-cj55507.tw1.ru/',
  'https://1137637-cj55507.tw1.ru/',
  '1137637-cj55507.tw1.ru',
];

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
