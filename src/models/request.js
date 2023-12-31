const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Request = new Schema(
	{
		status_request: {
			type: String,
			required: true,
			enum: ['requested', 'confirmed', 'checking', 'checked'],
		},
		produk: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		jumlah: {
			type: Number,
			min: 1,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id
				delete ret._id
				delete ret.__v
				return ret
			},
		},
	}
)

module.exports = mongoose.model('Request', Request)
