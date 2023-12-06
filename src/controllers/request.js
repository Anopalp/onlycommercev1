const RequestObj = require('../models/request')
const asyncHandler = require('express-async-handler')

const getAllRequests = asyncHandler(async (req, res, next) => {
	const data = await RequestObj.find({}).populate('produk')
	res.status(200).json(data)
})

const postRequest = asyncHandler(async (req, res, next) => {
	const { nama, produk, jumlah } = req.body
	let createdRequest = await RequestObj.create({
		nama_request: nama,
		produk,
		jumlah,
		status_request: 'requested',
	})
	createdRequest = createdRequest.toJSON()
	res.status(201).json({
		message: 'Request created',
		createdRequest,
	})
})

module.exports = { postRequest, getAllRequests }
