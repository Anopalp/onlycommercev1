const ProductsCatalogue = require('../models/catalogue');
const RequestObj = require('../models/request');

exports.getAllProducts = (req, res, next) => {
    res.status(200).json({
        message: 'Get All Products Success',
        data: [
            {
                id_produk: 1,
                nama_produk: "Sampo Zinc",
                jumlah_produk: 80,
                gambar_produk: "belum_ada"
            }
        ]
    });
    next();
}

exports.postRequest = (req, res, next) => {
    // Check if req.body exists and has the necessary properties
    if (!req.body || !req.body.pid || !req.body.req_stats || !req.body.req_quantity) {
        res.status(400).json({
            message: 'Bad Request. Missing required parameters.',
        });
        return;  // Return to exit the function
    }

    const pid = req.body.pid;
    const req_stats = req.body.req_stats;
    const req_quantity = req.body.req_quantity;

    const RequestMsg = new RequestObj({
        pid: pid,
        req_stats: req_stats,
        req_quantity: req_quantity
    })

    RequestMsg.save()
        .then(result => {
            res.status(201).json({
                message: 'Request Success',
                data: result
            });        
        })
        .catch(err => {
            console.log('err: ', err);
        });

    
}

exports.getAllRequests = (req, res, next) => {
    RequestObj.find()
        .then(result => {
            res.status(200).json({
                message: 'Data berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.getRequestById = (req, res, next) => {
    const postId = req.params.postId;
    RequestObj.findById(postId)
        .then(result => {
            if (!result) {
                const error = new Error('Request tidak ditemukan');
                error.errorStatus = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Data berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.updateRequest = (req, res, next) => {
    // Check if req.body exists and has the necessary properties
    if (!req.body || !req.body.pid || !req.body.req_stats || !req.body.req_quantity) {
        res.status(400).json({
            message: 'Bad Request. Missing required parameters.',
        });
        return;  // Return to exit the function
    }

    const pid = req.body.pid;
    const req_stats = req.body.req_stats;
    const req_quantity = req.body.req_quantity;
    const postId = req.params.postId;

    RequestObj.findById(postId)
        .then(request => {
            if (!request) {
                const err = new Error('Request tidak ditemukan');
                err.errorStatus = 404;
                throw err;
            }
            
            request.pid = pid;
            request.req_stats = req_stats;
            request.req_quantity = req_quantity;

            return request.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Update sukses',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.deleteRequest = (req, res, next) => {
    const postId = req.params.postId;

    RequestObj.findById(postId)
        .then(request => {
            if (!request) {
                const error = new Error('Request tidak ditemukan');
                error.errorStatus = 404;
                throw error;
            }
            return RequestObj.findByIdAndDelete(postId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Hapus request berhasil',
                data: result
            });
        })
        .catch(err => {
            next(err);
        })
}