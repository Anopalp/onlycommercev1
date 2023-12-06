const RequestObj = require('../models/request')
const requestRouter = require('express').Router()

requestRouter.post('/', async (req, res, next) => {
	const { nama, produk, jumlah } = req.body
	let createdRequest = await RequestObj.create({
		nama_request: nama,
		produk,
		jumlah,
		status_request: 'requested',
	})
	createdRequest = createdRequest.toJson()
	res.status(201).json({
		message: 'Request created',
		createdRequest,
	})
})

export default requestRouter
