var express = require('express');
var router = express.Router();
const { user, getUser, getAbsen, updateUser, postPilihTim, postInformasi } = require('../controllers/users.controller')

/* GET users listing. */
router.post('/', user);
router.get('/get/:id', getUser);
router.get('/getAbsen/:id', getAbsen)
router.post('/update', updateUser)
router.post('/pilihTim', postPilihTim)
router.post('/informasi', postInformasi)

module.exports = router;
