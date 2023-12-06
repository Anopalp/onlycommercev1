const express = require('express')
const router = express.Router()
const {
	postRequest,
	getAllRequests,
	getRequest,
} = require('../controllers/request')

router.get('/', getAllRequests)
router.get('/:id', getRequest)
router.post('/', postRequest)

module.exports = router
