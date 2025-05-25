import { updateUser, deleteUser } from '../controllers/UserController.js';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const mockReqRes = (body = {}, params = {}, user = {}) => ({
  req: { body, params, user },
  res: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
});

jest.mock('../models/UserModel.js');
jest.mock('bcryptjs');


describe('updateUser', () => {
  it('User updates if email matches and has data', async () => {
    const { req, res } = mockReqRes(
      { fullName: 'Nuevo Nombre', password: '123' },
      { email: 'a@b.com' },
      { email: 'a@b.com' }
    );
    bcrypt.hash.mockResolvedValue('hashed');
    UserModel.update.mockResolvedValue([1]);
    UserModel.findOne.mockResolvedValue({ id: 1, full_name: 'Nuevo Nombre', email: 'a@b.com' });

    await updateUser(req, res);

    expect(UserModel.update).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User updated successfully!' }));
  });
});


describe('deleteUser', () => {
  it('Delete user if email match', async () => {
    const { req, res } = mockReqRes({}, { email: 'a@b.com' }, { email: 'a@b.com' });
    UserModel.destroy.mockResolvedValue(1);

    await deleteUser(req, res);

    expect(UserModel.destroy).toHaveBeenCalledWith({ where: { email: 'a@b.com' } });
  });

  it('Access denied if email doesnt match', async () => {
    const { req, res } = mockReqRes({}, { email: 'x@y.com' }, { email: 'a@b.com' });

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Denied access.' });
  });
});
