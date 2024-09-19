import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var cardSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    expYear: {
        type: String,
        required: true,
    },
    expMonth: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "users"
    },
});


const CardModel = mongoose.model('Card', cardSchema);
export default CardModel