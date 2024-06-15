const mongoose= require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: true,
        },
        sku_id: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        shape: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        quantity: {
            type: String,
            required: true,
        },
        sub_admin_approved: {
            type: Boolean,
            required: true,
        },
        master_admin_approved: {
            type: Boolean,
            required: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports= Product;