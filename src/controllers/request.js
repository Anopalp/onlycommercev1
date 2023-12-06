const RequestObj = require('../models/request')

async function postRequest(req, res, next) {
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
}

module.exports = { postRequest }
