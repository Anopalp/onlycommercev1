const express = require('express')
const router = express.Router()
const { postRequest } = require('../controllers/request')

router.post('/', postRequest)
router.get('/', (req, res) => res.send('Bisaaa'))

module.exports = router
