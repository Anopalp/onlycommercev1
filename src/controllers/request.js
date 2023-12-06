const RequestObj = require('../models/request')
const asyncHandler = require('express-async-handler')

const getAllRequests = asyncHandler(async (req, res, next) => {
	const data = await RequestObj.find({}).populate('produk')
	if (data.length === 0) {
		res.status(404)
		throw new Error('Request not found')
	}
	res.status(200).json(data)
})

const getRequest = asyncHandler(async (req, res, next) => {
	const data = await RequestObj.findById(req.params.id).populate('produk')
	if (!data) {
		res.status(404)
		throw new Error('Request not found')
	}
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

const updateRequest = asyncHandler(async (req, res, next) => {
	let updatedRequest = await RequestObj.findByIdAndUpdate(
		req.params.id,
		{
			status_request: req.body.status,
		},
		{
			runValidators: true,
			new: true,
		}
	)
	res.status(200).json({
		message: 'Request updated',
		updatedRequest,
	})
})

module.exports = { postRequest, getAllRequests, getRequest, updateRequest }
