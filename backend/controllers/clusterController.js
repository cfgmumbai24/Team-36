const Product = require('../models/product');

module.exports.addProduct = async function(req, res) {
    try {
        const { category, image, description, quantity } = req.body;
        var shape, color, sku_id;
        var product_id;
        let product = await Product.findOne({ category: category, sku_id: sku_id });

        if (product) {
            // Product exists, update the quantity
            product.quantity += quantity;
            await product.save();
            return res.status(200).json({ message: 'Product quantity updated successfully', product });
        } else {
            // Product does not exist, create a new one
            const newProduct = new Product({
                category: category,
                image: image,
                description: description,
                quantity: quantity,
                shape: shape,
                color: color,
                sku_id: sku_id,
                product_id: product_id,
                sub_admin_approved: true,
                master_admin_approved: false
            });

            await newProduct.save();
            return res.status(201).json({ message: 'New product created successfully', product: newProduct });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).redirect('/');
    }
};
