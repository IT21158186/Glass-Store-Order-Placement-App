import express from 'express';
import { loginValidator } from '../middlewares/loginValidator.js';
import { deleteCardDetails, getAllCards, getAllTransactions, getCardDetails, getOneCard, saveCardDetails, updateCardDetails } from '../controllers/paymentController.js';

const payRouter = express.Router();

// Get logged-in user's saved card details
payRouter.get('/', loginValidator, getCardDetails);

// Get all transactions for a user
payRouter.get('/transactions', loginValidator, getAllTransactions);

// Get all cards (for admin purposes)
payRouter.get('/all', getAllCards);

// Get card by ID
payRouter.get('/:id', getOneCard);

// Save new card details
payRouter.post('/save', loginValidator, saveCardDetails);

// Update card by ID
payRouter.put('/:id', updateCardDetails);

// Delete card by ID
payRouter.delete('/:id', deleteCardDetails);

export default payRouter;
