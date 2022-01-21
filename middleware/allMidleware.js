const checkUser = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.redirect('/users/signin');
  }
};

const deepCheckUser = (req, res, next) => {
  if (req.session.userId === Number(req.params.id)) {
    next();
  } else {
    res.redirect(`/users/profile`);
  }
};

const welcomeUser = (req, res, next) => {
  res.locals.userId = req.session?.userId;
  if (req.session) {
    res.locals.userName = req.session.userName;
  }
  next();
};

module.exports = {
  checkUser, deepCheckUser, welcomeUser,
};
