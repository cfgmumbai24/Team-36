const Product =require("../models/product")

module.exports.getProducts=async function(req,res){
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
}