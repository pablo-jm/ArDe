import { getOrdersByLoggedUser, getUnpaidOrdersByLoggedUser, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';
import OrderModel from '../models/OrderModel.js';
import WorkModel from '../models/WorkModel.js';


beforeEach(() => {
  OrderModel.findAll = jest.fn();
  OrderModel.create = jest.fn();
  OrderModel.update = jest.fn();
  OrderModel.destroy = jest.fn();
});

const mockReqRes = (body = {}, params = {}, user = {}) => ({
  req: { body, params, user },
  res: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
});


describe('getOrdersByLoggedUser', () => {
  it('Should return paid orders with work data for logged user', async () => {
    const { req, res } = mockReqRes({}, {}, { id: 1 });
    const mockOrders = [{ id: 1, state: 'Paid', work: { title: 'Obra' } }];

    OrderModel.findAll.mockResolvedValue(mockOrders);

    await getOrdersByLoggedUser(req, res);

    expect(OrderModel.findAll).toHaveBeenCalledWith({
      where: { user_id: 1, state: 'Paid' },
      include: [{
        model: WorkModel,
        as: 'work',
        attributes: ['title', 'image_url', 'dimensions', 'state']
      }]
    });
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });
});


describe('getUnpaidOrdersByLoggedUser', () => {
  it('Should return unpaid orders with work data for logged user', async () => {
    const { req, res } = mockReqRes({}, {}, { id: 2 });
    const mockOrders = [{ id: 2, state: 'Unpaid', work: { title: 'Otra Obra' } }];

    OrderModel.findAll.mockResolvedValue(mockOrders);

    await getUnpaidOrdersByLoggedUser(req, res);

    expect(OrderModel.findAll).toHaveBeenCalledWith({
      where: { user_id: 2, state: 'Unpaid' },
      include: [{
        model: WorkModel,
        as: 'work',
        attributes: ['title', 'image_url', 'dimensions', 'state']
      }]
    });
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });
});


describe('createOrder', () => {
  it('Should create an order with given data', async () => {
    const orderData = {
      user_id: 1,
      work_id: 2,
      ship_address: 'Calle Falsa 123',
      phone_number: '123456789',
      price: 200
    };
    const { req, res } = mockReqRes(orderData);

    OrderModel.create.mockResolvedValue({ id: 1 });

    await createOrder(req, res);

    expect(OrderModel.create).toHaveBeenCalledWith(orderData);
    expect(res.json).toHaveBeenCalledWith({ message: 'Order created successfully' });
  });
});


describe('updateOrder', () => {
  it('Should update order by id', async () => {
    const body = { ship_address: 'Nueva Dirección' };
    const params = { id: 1 };
    const { req, res } = mockReqRes(body, params);

    OrderModel.update.mockResolvedValue([1]);

    await updateOrder(req, res);

    expect(OrderModel.update).toHaveBeenCalledWith(body, { where: { id: 1 } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Order updated successfully!' });
  });
});


describe('deleteOrder', () => {
  it('Should delete order by id', async () => {
    const params = { id: 5 };
    const { req, res } = mockReqRes({}, params);

    OrderModel.destroy.mockResolvedValue(1);

    await deleteOrder(req, res);

    expect(OrderModel.destroy).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Order deleted successfully!' });
  });
});
