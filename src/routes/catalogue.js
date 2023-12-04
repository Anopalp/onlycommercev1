const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogue');

router.get('/display', catalogueController.getAllProducts);
router.post('/request', catalogueController.postRequest);
router.get('/requests', catalogueController.getAllRequests);
router.get('/request/:postId', catalogueController.getRequestById);
router.put('/request/:postId', catalogueController.updateRequest);
router.delete('/request/:postId', catalogueController.deleteRequest);

module.exports = router;