const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Hello, Backend Server is running!');
});

module.exports = router;