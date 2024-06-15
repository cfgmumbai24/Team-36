import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        product_id: {
            type: Number,
            required: true,
        },
        sku_id: {
            type: Number,
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
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sub_admin_approved: {
            type: Boolean,
            required: true,
        },
        master_admin_approved: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);