import OrderModel from '../models/OrderModel.js'
import WorkModel from '../models/WorkModel.js'

export const getOrdersByLoggedUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.findAll({
      where: { user_id: userId, state: 'Paid' },
      include: [{ 
        model: WorkModel, 
        as: 'work', 
        attributes: ['title', 'image_url', 'dimensions', 'state']
      }]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnpaidOrdersByLoggedUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.findAll({
      where: { user_id: userId, state: 'Unpaid' },
      include: [{
        model: WorkModel,
        as: 'work',
        attributes: ['title', 'image_url', 'dimensions', 'state']
      }]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrder = async(req, res) => {
    try {
        const { user_id, work_id, ship_address, phone_number, price } = req.body;

        await OrderModel.create({
            user_id,
            work_id,
            ship_address,
            phone_number,
            price
        });

        res.json({ message: 'Order created successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateOrder = async(req, res) => {
    try {
        const { ship_address, phone_number } = req.body;

        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const updateData = {};
        if (ship_address !== undefined) updateData.ship_address = ship_address;
        if (phone_number !== undefined) updateData.phone_number = phone_number;
        
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        const [affectedRows] = await OrderModel.update(updateData, { 
            where: { id: orderId }
        });
        
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json({ message: 'Order updated successfully' });
        
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteOrder = async (req, res) => {
	try{
			await OrderModel.destroy({ where:{id:req.params.id}})
			res.json({message: "Order deleted successfully!"})
	} catch(error){
			res.json({message: error.message})
	}
};