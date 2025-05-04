import express  from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/OrderController.js'


const orderRouter = express.Router();


orderRouter.get('/', getAllOrders)
orderRouter.get('/:id', getOrderById)
orderRouter.post('/', createOrder)
orderRouter.put('/:id', updateOrder)
orderRouter.delete('/:id', deleteOrder)


export default orderRouter
