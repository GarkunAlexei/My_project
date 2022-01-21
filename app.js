require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
const { welcomeUser } = require('./middleware/allMidleware');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const apiRouter = require('./routes/api');

const PORT = process.env.PORT ?? 3000;

hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// console.log(FileStore);
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'Albert',
  store: new FileStore(),
}));

app.use(welcomeUser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Server started on port: ', PORT);
});
