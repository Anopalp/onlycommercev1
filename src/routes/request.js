const express = require('express')
const router = express.Router()
const {
	postRequest,
	getAllRequests,
	getRequest,
	updateRequest,
} = require('../controllers/request')

router.get('/', getAllRequests)
router.get('/:id', getRequest)
router.post('/', postRequest)
router.put('/:id', updateRequest)

module.exports = router
