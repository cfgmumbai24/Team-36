const Admin =require("../models/admin")
const Product = require('../models/product');

module.exports.subAdminApproval= async function(req, res) {
    try {
        const { _id } = req.body; // Assuming the product ID is sent in the request body

        // Find the product by product_id or _id and update the approval field to true
        const product = await Product.findOneAndUpdate(
            { _id: _id }, // Adjust this if you are using product_id or another identifier
            { sub_admin_approved: true },
        );

        if (product) {
            res.status(200).json({ message: 'Sub admin approval updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating product approval' });
    }
}

module.exports.updateQuantity = async function(req, res) {
    try {
        const { id, quantity } = req.body; // Assuming the product ID and new quantity are sent in the request body

        // Find the product by ID and update the quantity
        const product = await Product.findByIdAndUpdate(
            id, // Using the product's unique ID
            { quantity: quantity },
        );

        if (product) {
            res.status(200).json({ message: 'Product quantity updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating product quantity' });
    }
};

module.exports.updateProduct = async function(req, res) {
    try {
        const { _id, price, quantity, description, sub_admin_approved } = req.body; // Extract fields from the request body

        // Build the update object conditionally
        let updateData = {};
        if (price !== undefined) updateData.price = price;
        if (quantity !== undefined) updateData.quantity = quantity;
        if (description !== undefined) updateData.description = description;
        if (sub_admin_approved !== undefined) updateData.sub_admin_approved = sub_admin_approved;

        // Find the product by ID and update its details
        const product = await Product.findByIdAndUpdate(
            _id, // Using the product's unique ID
            updateData, // The updates to be applied
        );

        if (product) {
            res.status(200).json({ message: 'Product updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while updating the product." });
    }
};

module.exports.deleteProduct= async function(req, res) {
    try {
        const productId = req.body._id;

        // Ensure the productId is provided
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        // Attempt to delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // If no product is found, respond with an error
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'An error occurred while deleting the product.', error: error.message });
    }
}