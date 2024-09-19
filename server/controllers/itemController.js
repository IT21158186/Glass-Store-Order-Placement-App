import CardModel from "../models/Card.js";
import ItemModel from "../models/Item.js";
import TransactionModel from "../models/Transaction.js";

export const createItem = async (req, res) => {
    try {
        const data = req.body;

        const item = await ItemModel.create(data)
        res.status(200).json(item)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const getAllItems = async (req, res) => {
    try {
        const items = await ItemModel.find()
        res.status(200).json(items)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const getOneitem = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await ItemModel.findById(id)
        res.status(200).json(items)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const buyItem = async (req, res) => {
    try {
        const { cardId, amount, userid } = req.body;
        const card = await CardModel.findById(cardId);
        if (!card) {
            throw Error('Card not found')
        }
        if (card.balance < amount) {
            throw Error('Insufficiant Balance')
        }
        card.balance = card.balance - amount;
        await card.save();
        const tsc = await TransactionModel.create( { cardId, amount, userid })
        res.status(200).json(tsc)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}