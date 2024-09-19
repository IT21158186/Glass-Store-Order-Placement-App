import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg"
    },
});

//Export the model
const ItemModel = mongoose.model('Item', itemSchema);
export default ItemModel