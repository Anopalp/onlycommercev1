const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestObj = new Schema(
	{
		id_request: {
			type: Number,
			required: true,
		},
		nama_request: {
			type: String,
			required: true,
		},
		status_request: {
			type: String,
			required: true,
			enum: ['requested', 'confirmed', 'checking', 'checked'],
		},
		produk: {
			type: Schema.Types.ObjectId,
			ref: 'ProductsCatalogue',
		},
		jumlah: {
			type: Number,
			min: 1,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('RequestObj', RequestObj)
