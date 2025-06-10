import express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getOrdersByLoggedUser, getUnpaidOrdersByLoggedUser, createOrder, updateOrder, deleteOrder } from '../controllers/OrderController.js'


const orderRouter = express.Router();


orderRouter.get('/user/me', verifyToken, getOrdersByLoggedUser)
orderRouter.get('/user/me/unpaid', verifyToken, getUnpaidOrdersByLoggedUser);
orderRouter.post('/', verifyToken, createOrder)
orderRouter.put('/:id', verifyToken, updateOrder)
orderRouter.delete('/:id', verifyToken, deleteOrder)


export default orderRouter
