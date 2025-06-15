import { getAllWorks, createWork, updateWork } from '../controllers/workController.js';
import WorkModel from '../models/WorkModel.js';

jest.mock('../models/WorkModel.js');

const mockRes = () => ({
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
});

describe('getAllWorks', () => {
  it('Should return works with state "selling"', async () => {
    const res = mockRes();
    const req = {};

    const works = [{ title: 'Obra 1', state: 'selling' }];
    WorkModel.findAll.mockResolvedValue(works);

    await getAllWorks(req, res);

    expect(WorkModel.findAll).toHaveBeenCalledWith({ where: { state: 'selling' } });
    expect(res.json).toHaveBeenCalledWith(works);
  });
});


describe('createWork', () => {
  it('Should return 400 if required fields are missing', async () => {
    const res = mockRes();
    const req = { body: { title: 'X' } };

    await createWork(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Fields: title, description, image, price y dimensions are requires.',
    });
  });

  it('should return 400 if work already exists', async () => {
    const res = mockRes();
    const req = {
      body: {
        title: 'Obra',
        description: 'descripcion de algo',
        image_url: 'img',
        price: 10,
        dimensions: '30x30 cm',
      },
    };

    WorkModel.findOne.mockResolvedValue({ title: 'Obra' });

    await createWork(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Work was already created.' });
  });

  it('Should create new work and return 201', async () => {
    const res = mockRes();
    const req = {
      body: {
        title: 'Nueva',
        description: 'descripcion de algo',
        image_url: 'img',
        price: 10,
        dimensions: '30x30 cm',
      },
    };

    WorkModel.findOne.mockResolvedValue(null);
    WorkModel.create.mockResolvedValue({ id: 1, ...req.body });

    await createWork(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Work created successfully!',
        work: expect.objectContaining({ title: 'Nueva' }),
      })
    );
  });
});


describe('updateWork', () => {
  it('should return message "Obra sin stock." if state is sold', async () => {
    const res = mockRes();
    const req = { body: { state: 'sold' }, params: { title: 'Obra' } };

    WorkModel.update.mockResolvedValue([1]);

    await updateWork(req, res);

    expect(WorkModel.update).toHaveBeenCalledWith(req.body, { where: { title: 'Obra' } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Obra sin stock.' });
  });

  it('should return success message if state is not sold', async () => {
    const res = mockRes();
    const req = { body: { state: 'selling' }, params: { title: 'Obra' } };

    WorkModel.update.mockResolvedValue([1]);

    await updateWork(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Work updated successfully!' });
  });
});
