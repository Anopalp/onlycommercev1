const express = require('express')
const router = express.Router()
const { postRequest, getAllRequests } = require('../controllers/request')

router.get('/', getAllRequests)
router.post('/', postRequest)

module.exports = router
