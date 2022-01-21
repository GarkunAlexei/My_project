const express = require('express');

const { User, Answer } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.findByPk(req.session.userId);
  const allQuestion = await User.findOne({
    where: { id: req.session.userId },
    include: Answer,
  });
  const arrQuestions = allQuestion.Answers;
  const dataForFront = arrQuestions.map((element) => ({
    id: element.id,
    question: element.question,
    answer: element.answer,
    createdAt: element.createdAt.toLocaleString(),
    img: element.img,
    user_id: element.user_id,
  }));
  res.render('profile', { user, dataForFront });
});

module.exports = router;
