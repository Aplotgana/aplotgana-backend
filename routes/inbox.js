const express = require('express')
const router = express.Router()

const { getInboxAdmin, getInboxUser } = require('../controllers/inbox.controller')

router.get('/admin', getInboxAdmin)
router.get('/user/:id', getInboxUser)

module.exports = router