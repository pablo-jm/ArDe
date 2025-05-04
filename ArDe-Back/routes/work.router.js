import express  from 'express';
import { getAllWorks, getWorkByTitle, createWork, updateWork, deleteWork } from '../controllers/WorkController.js'

const workRouter = express.Router();


workRouter.get('/', getAllWorks)
workRouter.get('/:title', getWorkByTitle)
workRouter.post('/', createWork)
workRouter.put('/:title', updateWork)
workRouter.delete('/:title', deleteWork)


export default workRouter