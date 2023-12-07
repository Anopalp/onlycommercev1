const express = require('express');
const router = express.Router();
const product = require('../controllers/product');

router.get('/products', product.getAllProducts);
router.get('/product/:pId', product.getProductById);
router.put('/product/:pId', product.updateProduct);
router.post('/product', product.postProduct);
router.delete('/product/:pId', product.deleteProduct);

module.exports = router;