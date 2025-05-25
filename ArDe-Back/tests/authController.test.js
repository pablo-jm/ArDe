import { register, login } from '../controllers/AuthController.js';
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


jest.mock('../models/UserModel.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');


describe('Register', () => {
  it('Create new user if email is not registered', async () => {
    const req = mockRequest({
      email: 'test@example.com',
      password: '123456',
      fullName: 'Test User',
    });
    const res = mockResponse();

    UserModel.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed_password');
    UserModel.create.mockResolvedValue({
      id: 1,
      full_name: 'Test User',
      email: 'test@example.com',
    });
    jwt.sign.mockReturnValue('fake-jwt-token');

    await register(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(UserModel.create).toHaveBeenCalledWith({
      full_name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
    });
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario creado exitosamente.',
      token: 'fake-jwt-token',
      user: {
        id: 1,
        fullName: 'Test User',
        email: 'test@example.com',
      },
    });
  });
});


describe('Login', () => {
  it('Login correctly if user and password are valid', async () => {
    const req = mockRequest({
      email: 'test@example.com',
      password: '123456',
    });
    const res = mockResponse();

    UserModel.findOne.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      full_name: 'Test User',
      password: 'hashed_password',
      role: 'user',
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-jwt-token');

    await login(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' }, attributes: ['id', 'email', 'full_name', 'password', 'role'] });
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: 'Inicio de sesión exitoso.',
      token: 'fake-jwt-token',
      user: {
        id: 1,
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user',
      },
    });
  });
});
