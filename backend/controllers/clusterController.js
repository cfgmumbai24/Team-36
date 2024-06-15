const Product = require('../models/product');

module.exports.addProduct = async function(req, res) {
    try {
        console.log("here");
        const { name, category, quantity, shape, color, sku_id, image } = req.body;
        // const image= req.file;
        // if (!req.file) {
        //     console.log("fafaf");
        //     return res.status(400).json({ error: 'No file uploaded' });
        // }
    
        // Convert the uploaded file buffer to base64
        // console.log(image);

        let product = await Product.findOne({ category: category, sku_id: sku_id });

        if (product) {
            // Product exists, update the quantity
            product.quantity += quantity;
            await product.save();
            return res.status(200).json({ message: 'Product quantity updated successfully', product });
        } else {
            // Product does not exist, create a new one
            const newProduct = new Product({
                name: name,
                category: category,
                image: image,
                description: "",
                quantity: quantity,
                shape: shape,
                color: color,
                sku_id: sku_id,
                sub_admin_approved: true,
                master_admin_approved: false
            });

            await newProduct.save();
            return res.status(201).json({ message: 'New product created successfully', product: newProduct });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
};
