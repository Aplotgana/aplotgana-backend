var express = require('express');
var router = express.Router();
const { user, getUser } = require('../controllers/users.controller')

/* GET users listing. */
router.post('/', user);
router.get('/get', getUser);

module.exports = router;
