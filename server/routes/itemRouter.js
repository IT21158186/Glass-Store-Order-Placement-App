import express from 'express'
import { loginValidator } from '../middlewares/loginValidator.js';
import { buyItem, createItem, getAllItems, getOneitem } from '../controllers/itemController.js';
const itemRouter = express.Router();

itemRouter.get('/',getAllItems)
itemRouter.get('/:id',getOneitem)

itemRouter.post('/', createItem)
itemRouter.put('/buy',loginValidator, buyItem);



export default itemRouter;