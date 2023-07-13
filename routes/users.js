var express = require('express');
var router = express.Router();
const { user, getUser, getAbsen } = require('../controllers/users.controller')

/* GET users listing. */
router.post('/', user);
router.get('/get', getUser);
router.get('/getAbsen/:id', getAbsen)

module.exports = router;
