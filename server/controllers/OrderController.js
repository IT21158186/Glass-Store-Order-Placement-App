import CartModel from "../models/CartModel.js";
import OrderModel from "../models/OrderModel.js";
import PaymentModel from "../models/PaymentModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    const { userId, address, email, cardNo, mm, yy, name, price } = req.body;

    // // Basic input validation
    // if (!userId || !address || !email || !cardNo || !mm || !yy || !name || !price) {
    //     return res.status(400).json({ message: 'All fields are required.' });
    // }

    try {
        const newOrder = new OrderModel({
            userId,
            address,
            email,
            cardNo,
            mm,
            yy,
            name,
            price,
        });

        console.log(newOrder);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: `Error creating order: ${error.message}` });
    }
};

// Get all orders// Make sure to import your OrderModel

export const getOrdersByUser = async (req, res) => {
    const { userId } = req.params;
     // Get the userId from request parameters
    console.log(userId); // Debugging: Log userId to the console

    try {
        // Find orders based on userId and populate user details (name, email)
        const orders = await OrderModel.find({ userId })
            .populate('userId', 'name email');

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders); // Send the orders as JSON response
    } catch (error) {
        // Handle errors and send a 500 error response with the error message
        res.status(500).json({ message: `Error fetching orders: ${error.message}` });
    }
};


// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate('userId', 'name email'); // Populate user data
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: `Error fetching orders: ${error.message}` });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id)
            .populate('userId', 'name email');

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: `Error fetching order: ${error.message}` });
    }
};

// Update an order by ID
export const updateOrder = async (req, res) => {

    const id = req.params.id;
    const newAddress = req.body.newAddress;
    console.log(newAddress)

    try {

        const updatedOrder = await OrderModel.findByIdAndUpdate(id, { address: newAddress }, { new: true });
        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: `Error updating order: ${error.message}` });
    }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting order: ${error.message}` });
    }
};
