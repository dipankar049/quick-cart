const express = require('express');
const { 
    getAllProduct, 
    addProduct, 
    getSingleProduct, 
    getCart, 
    addToCart,
    removeFromCart
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/produts', getAllProduct);
router.post('/addProduct', authMiddleware, addProduct);
router.get('/produts/:id', getSingleProduct);

router.get('/cart', authMiddleware, getCart);
router.post('/cart', authMiddleware, addToCart);
router.delete('/cart/:id', authMiddleware, removeFromCart);

module.exports = router;