import OrderModel from '../models/OrderModel.js'


//getAllOrders
export const getAllOrders = async(req, res) => {
    try{
        const orders = await OrderModel.findAll();
        res.json(orders);
    }catch(error){
        res.json({message: error.message});
    }
}

//getOrderById
export const getOrderById = async(req, res) => {
    try{
        const order = await OrderModel.findOne({where:{id: req.params.id}});
        res.json(order);
    }catch(error){
        res.json({message: error.message});
    }
}

//createOrder
export const createOrder = async(req, res) => {
    try{
        await OrderModel.create(req.body);
        res.json({message: 'Order created succesfully'});
    }catch(error){
        res.json({message: error.message});
    }
}

//updateOrder ¿?
export const updateOrder = async(req,res) =>{
	try{ 
			await OrderModel.update(req.body, { where:{id:req.params.id}})
			res.json({message: "Order updated successfully!"})
		}
	catch(error){
			res.json({message: error.message})
		}
	}

//deleteOrder ¿?
export const deleteOrder = async (req, res) => {
	try{
			await OrderModel.destroy({ where:{id:req.params.id}})
			res.json({message: "Order deleted successfully!"})
	} catch{
			res.json({message: error.message})
	}
}