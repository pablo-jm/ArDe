import express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { getAllWorks, getWorkByTitle, createWork, updateWork } from '../controllers/WorkController.js'

const workRouter = express.Router();


workRouter.get('/', getAllWorks)
workRouter.get('/:title', getWorkByTitle)
workRouter.post('/', verifyToken, verifyAdmin,  createWork)
workRouter.put('/:title', verifyToken, verifyAdmin, updateWork)


export default workRouter