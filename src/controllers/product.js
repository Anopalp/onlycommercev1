const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                message: 'Data Produk Berhasil Diambil',
                data: result
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.getProductById = (req, res, next) => {
    const pId = req.params.pId;
    Product.findById(pId)
        .then(result => {
            if (!result) {
                const error = new Error('Produk Tidak Ditemukan');
                error.status = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Data Produk Berhasil Diambil',
                data: result
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.postProduct = (req, res, next) => {
    if (!req.body || !req.body.nama_produk || !req.body.jumlah_produk || !req.body.harga || !req.body.posisi) {
        res.status(400).json({
            message: 'Bad Request. Lengkapi Parameter!'
        });
        return;
    }

    const id_produk = req.body.id_produk;
    const nama_produk = req.body.nama_produk;
    const jumlah_produk = req.body.jumlah_produk;
    const harga = req.body.harga;
    const blok = req.body.blok;

    const newProduct = new Product({
        id_produk: id_produk,
        nama_produk: nama_produk,
        jumlah_produk: jumlah_produk,
        harga: harga,
        blok: blok
    })

    newProduct.save()
        .then(result => {
            res.status(201).json({
                message: 'Data Berhasil Ditambahkan',
                data: result
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.updateProduct = (req, res, next) => {
    if (!req.body || !req.body.jumlah_produk) {
        res.status(400).json({
            message: 'Bad Request. Lengkapi Parameter!'
        });
        return;
    }

    const jumlah_produk = req.body.jumlah_produk;
    const pId = req.params.pId;

    Product.findById(pId)
        .then(dataProduct => {
            if (!dataProduct) {
                const err = new Error('Request tidak ditemukan');
                err.errorStatus = 404;
                throw err;
            }

            dataProduct.jumlah_produk = jumlah_produk;

            return dataProduct.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Data Berhasil Di-update',
                data: result
            });
        })
        .catch(err => {
            next(err);
        });

}

exports.deleteProduct = (req, res, next) => {
    const pId = req.params.pId;

    Product.findById(pId)
        .then(request => {
            if (!request) {
                const error = new Error('Request Tidak Ditemukan');
                error.status(404);
                throw error;
            }
            return Product.findByIdAndDelete(pId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Data Berhasil Dihapus',
                data: result
            });
        })
        .catch(err => {
            next(err);
        });
}