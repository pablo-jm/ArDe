import express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getAllOrders, getOrdersByLoggedUser, createOrder, updateOrder, deleteOrder } from '../controllers/OrderController.js'


const orderRouter = express.Router();


orderRouter.get('/', getAllOrders)
orderRouter.get('/user/me', verifyToken, getOrdersByLoggedUser)
orderRouter.post('/', verifyToken, createOrder)
orderRouter.put('/:id', verifyToken, updateOrder)
orderRouter.delete('/:id', deleteOrder)


export default orderRouter
