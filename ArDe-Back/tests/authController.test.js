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

beforeEach(() => {
  jest.clearAllMocks();
});


describe('Register', () => {
  it('Create a new user when email is not registered', async () => {
    const req = mockRequest({
      email: 'test@example.com',
      password: 'Password1',
      fullName: 'Test User',
    });
    const res = mockResponse();

    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
    jest.spyOn(UserModel, 'create').mockResolvedValue({
      id: 1,
      full_name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-token');

    await register(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(bcrypt.hash).toHaveBeenCalledWith('Password1', 10);
    expect(UserModel.create).toHaveBeenCalledWith({
      full_name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password',
    });
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String),
      token: 'fake-token',
      user: expect.objectContaining({
        id: 1,
        fullName: 'Test User',
        email: 'test@example.com',
      }),
    }));
  });
});

describe('Login', () => {
  it('Login user if email and password are valid', async () => {
    const req = mockRequest({
      email: 'test@example.com',
      password: 'Password1',
    });
    const res = mockResponse();

    jest.spyOn(UserModel, 'findOne').mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      full_name: 'Test User',
      password: 'hashed_password',
      role: 'user',
    });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-token');

    await login(req, res);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
      attributes: ['id', 'email', 'full_name', 'password', 'role'],
    });
    expect(bcrypt.compare).toHaveBeenCalledWith('Password1', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.any(String),
      token: 'fake-token',
      user: expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user',
      }),
    }));
  });
});
