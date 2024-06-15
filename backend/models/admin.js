import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone_no: {
            type: String, // Changed from Number to String
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model("Admin", adminSchema);