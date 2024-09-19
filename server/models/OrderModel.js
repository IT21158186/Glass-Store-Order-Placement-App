import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users', // Reference to the user who placed the order
        required: true // Make userId required
    },
    address: {
        type: String,
        required: true // Address is required
    },
    email: {
        type: String,
        required: true // Email of the user placing the order
    },
    cardNo: {
        type: String,
        required: true // Card number is required
    },
    mm: {
        type: String,
        required: true // Expiration month is required
    },
    yy: {
        type: String,
        required: true // Expiration year is required
    },
    name: {
        type: String,
        required: true // Cardholder name is required
    },
    price: {
        type: Number,
        required: true // Total price is required
    },
}, { timestamps: true }); // Automatically create createdAt and updatedAt fields

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;
