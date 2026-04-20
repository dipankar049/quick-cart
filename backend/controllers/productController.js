const Cart = require("../models/cart");
const Products = require("../models/products");

const addProduct = async(req, res) => {
    try {
        const { name, price, stock, category, fun_fact } = req.body;

        if(!name.trim() || !price || !stock || !category.trim() || !fun_fact.trim()) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        if(price < 0) {
            return res.status(400).json({ success: false, error: "Price can't be less than 0" });
        }

        if(stock < 1) {
            return res.status(400).json({ success: false, error: "Stock can't be less than 1" });
        }

        const newProduct = new Products({
            name: name.trim(),
            price,
            stock,
            category: category.trim(),
            fun_fact: fun_fact.trim(),
            vendor: req.userId,
        });

        const product = await newProduct.save();

        res.status(201).json({ success: true, data: product });
    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

const getAllProduct = async(req, res) => {
    try {
        const products = await Products.find().limit(50);

        res.status(200).json({ success: true, data: products });
    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

const getSingleProduct = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findById(id);

        if(!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

const addToCart = async(req, res) => {
    try {
        const { productId, quantity } = req.body;

        if(!productId || !quantity) {
            return res.status(400).json({ success: false, error: "All fields required" });
        }

        const product = await Products.findById(productId);

        if(!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        if(product.stock <= 0) {
            return res.status(409).json({ success: false, error: "Product is out of stock" })
        }

        if(product.stock < quantity) {
            return res.status(409).json({ success: false, error: `Only ${product.stock} items left` });
        }

        const newCart = new Cart({
            userId: req.userId,
            product: productId,
            quantity
        });

        const cartItem = await newCart.save();

        res.status(201).json({ success: true, data: cartItem });
    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

const getCart = async(req, res) => {
    try {
        const userCart = await Cart.find({ userId: req.userId })
        .populate('product');

        res.status(200).json({ success: true, data: userCart });
    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

const removeFromCart = async(req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findById(id);
        if(!cart) {
            return res.status(404).json({ success: false, error: "Cart Item not found" });
        }

        if(cart.userId !== req.userId) {
            return res.status(403).json({ success: false, error: "Not authorized to delete this item" });
        }

        await cart.deleteOne();

        res.status(200).json({ success: true });
    } catch(err) {
        res.status(500).json({ success: false, error: "Server error, please try again later" });
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getSingleProduct,

    addToCart,
    getCart,
    removeFromCart,
}