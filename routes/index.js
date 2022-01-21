const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

// router.post('/', (req, res) => {
//   console.log('AAAAAA------>', req.body);
//   res.render('index');
// });

module.exports = router;
