const Products = require("../models/products");

const addProduct = async(req, res) => {
    try {
        const { name, price, stock, category, fun_fact } = req.body;

        if(!name.trim() || !price || !stock || !category.trim() || !fun_fact.trim()) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if(price < 0) {
            return res.status(400).json({ msg: "Price can't be less than 0" });
        }

        if(stock < 1) {
            return res.status(400).json({ msg: "Stock can't be less than 1" });
        }

        const newProduct = new Products({
            name: name.trim(),
            price,
            stock,
            category: category.trim(),
            fun_fact: fun_fact.trim()
        });

        const product = await newProduct.save();

        res.status(201).json({ newProduct: product, msg: "Product added successfully" });
    } catch(err) {
        res.status(500).json({ msg: "Server error, please try again later" });
    }
}

const getAllProduct = async(req, res) => {
    try {
        const products = await Products.find().limit(50);

        res.status(200).json({ products });
    } catch(err) {
        res.status(500).json({ msg: "Server error, please try again later" });
    }
}

const getSingleProduct = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findById(id);

        if(!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ product });
    } catch(err) {
        res.status(500).json({ msg: "Server error, please try again later" });
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getSingleProduct,
}