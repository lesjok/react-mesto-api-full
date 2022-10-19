require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cors = require('./middlewares/cors');
const { regExp } = require('./constants/regularExpression');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const errorMessage = require('./errors/errorMessage');
const NotFound = require('./errors/notFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена.'));
});
app.get('/signout', (req, res) => {
  res.clearCookie('access_token').send({ message: 'Выход' });
});
app.use(errorLogger);
app.use(errors());
app.use(errorMessage);
app.listen(PORT);
