const express = require('express');
const { getAllProduct, addProduct, getSingleProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/produts', getAllProduct);
router.post('/addProduct', authMiddleware, addProduct);
router.get('/produts/:id', getSingleProduct);

module.exports = router;