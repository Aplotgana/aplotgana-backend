const express = require('express');
const router = express.Router();

const { postCatatan } = require('../controllers/catatan.controller')

router.post('/', postCatatan);

module.exports = router;