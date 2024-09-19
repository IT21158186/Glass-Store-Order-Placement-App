import express from 'express';
import { createOrder, deleteOrder, getOrders, getOrderById, updateOrder, getOrdersByUser } from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.post('/createOrder',  createOrder);
orderRouter.get('/all', getOrders);
orderRouter.get('/getOrders/:userId', getOrdersByUser);
orderRouter.get('/:id', getOrderById);
orderRouter.delete('/:id', deleteOrder);
orderRouter.put('/:id', updateOrder);

export default orderRouter;
