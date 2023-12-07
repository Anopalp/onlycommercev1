const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    id_produk: {
        type: Number,
        required: true
    },
    nama_produk: {
        type: String,
        required: true
    },
    jumlah_produk: {
        type: Number,
        required: true
    },
    gambar_produk: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', Product);