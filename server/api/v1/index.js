const express = require('express');
const router = express.Router();
const tweets = require('./tweets/routes');
const authors = require('./authors/routes');

router.use('/tweets', tweets);
router.use('/authors', authors);

module.exports = router;
