import CardModel from "../models/Card.js";
import TransactionModel from "../models/Transaction.js";

// Save new card details
export const saveCardDetails = async (req, res) => {
    try {
        const data = req.body;

        // Validate necessary fields
        if (!data.cardNumber || !data.expYear || !data.expMonth || !data.cvv || !data.name || !data.email) {
            return res.status(400).json({ message: 'Required fields are missing: cardNumber, expYear, expMonth, cvv, name' });
        }
        if (data.cardNumber.length < 16) {
            return res.status(400).json({ message: 'Card number should be 16 digits' });
        }
        if (data.expYear < new Date().getFullYear()) {
            return res.status(400).json({ message: 'Card is expired' });
        }

        // Add card details
        const card = await CardModel.create(data);

        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete card by ID
export const deleteCardDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await CardModel.findByIdAndDelete(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update card by ID
export const updateCardDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await CardModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(card); // Send updated card details as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all cards for the logged-in user
export const getCardDetails = async (req, res) => {
    try {
        const { userid } = req.body;

        const cards = await CardModel.find({ userid });
        if (!cards.length) {
            return res.status(404).json({ message: 'No cards found for this user' });
        }

        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all cards (Admin or for all users)
export const getAllCards = async (req, res) => {
    try {
        const cards = await CardModel.find();

        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get one card by ID
export const getOneCard = async (req, res) => {
    try {
        const { id } = req.params;

        const card = await CardModel.findById(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions for a user
export const getAllTransactions = async (req, res) => {
    try {
        const { userid } = req.body;

        const transactions = await TransactionModel.find({ userid });
        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


