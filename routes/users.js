const express = require('express');
const sha256 = require('sha256');
const { User, Answer } = require('../db/models');

const router = express.Router();

/* GET users listing. */
router.get('/signup', async (req, res) => {
  res.render('signupPage');
});
router.post('/signup', async (req, res) => {
  const { name, email } = req.body;
  const password = sha256(req.body.password);
  if (name && email && req.body.password) {
    const user = await User.create({
      name, email, password,
    });
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.send('Все поля нужно заполнить!');
  }
});

router.get('/signin', (req, res) => {
  res.render('loginPage');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (user.password === sha256(password)) {
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      req.session.userId = user.id;
      req.session.rolId = user.rol_id;
      res.redirect('/');
    } else {
      res.send(`wrong password, valid is ${user.password}`);
    }
  } else {
    res.redirect('/users/signip');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
