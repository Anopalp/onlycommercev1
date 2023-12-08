const Request = require('../models/request')
const asyncHandler = require('express-async-handler')

const getAllRequests = asyncHandler(async (req, res, next) => {
	const data = await Request.find({}).populate('produk')
	if (data.length === 0) {
		res.status(404)
		throw new Error('Request Tidak Ditemukan')
	}
	res.status(200).json({
		message: 'Data Request Berhasil Diambil',
		data,
	})
})

const getRequest = asyncHandler(async (req, res, next) => {
	const data = await Request.findById(req.params.id).populate('produk')
	if (!data) {
		res.status(404)
		throw new Error('Request Tidak Ditemukan')
	}
	res.status(200).json({
		message: 'Data Request Berhasil Diambil',
		data,
	})
})

const postRequest = asyncHandler(async (req, res, next) => {
	const { produk, jumlah } = req.body
	if (!produk || !jumlah) {
		res.status(400)
		throw new Error('Bad Request. Lengkapi Parameter!')
	}
	let createdRequest = await Request.create({
		nama_request: nama,
		produk,
		jumlah,
		status_request: 'requested',
	})
	createdRequest = createdRequest.toJSON()
	res.status(201).json({
		message: 'Request Berhasil Ditambahkan',
		createdRequest,
	})
})

const updateRequest = asyncHandler(async (req, res, next) => {
	const id = req.params.id
	const newStatus = req.body.status
	const statusOptions = ['requested', 'confirmed', 'checking', 'checked']
	const { status_request: oldStatus } = await Request.findById(id)

	if (!statusOptions.includes(newStatus)) {
		res.status(400)
		throw new Error(
			'Status hanya bisa requested, confirmed, checking, dan checked'
		)
	}

	if (oldStatus === 'requested' && newStatus !== 'confirmed') {
		res.status(400)
		throw new Error(
			'Status requested hanya boleh diikuti dengan status confirmed'
		)
	} else if (oldStatus === 'confirmed' && newStatus !== 'checking') {
		res.status(400)
		throw new Error(
			'Status confirmed hanya boleh diikuti dengan status checking'
		)
	} else if (oldStatus === 'checking' && newStatus !== 'checked') {
		res.status(400)
		throw new Error('Status checking hanya boleh diikuti dengan status checked')
	}

	if (newStatus === 'checked') {
		await Request.findByIdAndDelete(id)
		res.status(200).json({
			message: 'Request Berhasil Di-update dan Dihapus',
		})
	} else {
		let updatedRequest = await Request.findByIdAndUpdate(
			id,
			{
				status_request: newStatus,
			},
			{
				runValidators: true,
				new: true,
			}
		).populate('produk')
		res.status(200).json({
			message: 'Request Berhasil Di-update',
			updatedRequest,
		})
	}
})

module.exports = { postRequest, getAllRequests, getRequest, updateRequest }
