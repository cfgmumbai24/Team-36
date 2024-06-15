const Admin =require("../models/admin")
const Product = require('../models/product');

module.exports.addAdmin=async function(req,res){
    try{
            var name= req.body.name
            var email =req.body.email
            var phone_no= req.body.phone_no
            var password =req.body.password
            var role= req.body.role

            let admin= await Admin.create({
                name:name,
                email:email,
                phone_no:phone_no,
                password:password,
                role:role
            })
            return res.status(200).json({ message: 'Admin added successfully', admin });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
}

module.exports.masterApproval= async function(req, res) {
    try {
        const { _id } = req.body; // Assuming the product ID is sent in the request body

        // Find the product by product_id or _id and update the approval field to true
        const product = await Product.findOneAndUpdate(
            { _id: _id }, // Adjust this if you are using product_id or another identifier
            { master_admin_approved: true },
        );

        if (product) {
            res.status(200).json({ message: 'Master admin approval updated successfully', product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating product approval' });
    }
}

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