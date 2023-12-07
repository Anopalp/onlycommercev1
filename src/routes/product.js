const express = require('express')
const router = express.Router()
const product = require('../controllers/product')

router.get('/', product.getAllProducts)
router.get('/:pId', product.getProductById)
router.put('/:pId', product.updateProduct)
router.post('/', product.postProduct)
router.delete('/:pId', product.deleteProduct)

module.exports = router
