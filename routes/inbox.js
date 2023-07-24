const express = require('express')
const router = express.Router()

const { getInboxAdmin, getInboxUser, getPengumuman } = require('../controllers/inbox.controller')

router.get('/admin', getInboxAdmin)
router.get('/user/:id', getInboxUser)
router.get('/pengumuman', getPengumuman)

module.exports = router