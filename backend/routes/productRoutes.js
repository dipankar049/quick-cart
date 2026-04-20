const express = require('express');
const { getAllProduct, addProduct, getSingleProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/produts', getAllProduct);
router.post('/addProduct', addProduct);
router.get('/produts/:id', getSingleProduct);

module.exports = router;