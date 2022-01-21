const express = require('express');

const { User, Answer } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  // console.log('data from Front -->>', req.body);
  const { question, answer, img } = req.body;
  const user_id = req.session.userId;
  // console.log(question, answer, img, user_id);
  try {
    await Answer.create({
      question, answer, img, user_id,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
