const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestObj = new Schema({
    pid: {
        type: Number,
        required: true
    },
    req_stats: {
        type: String,
        required: true
    },
    req_quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RequestObj', RequestObj);