import express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { getAllEvents, updateEvent } from '../controllers/EventController.js'

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents)
eventRouter.put('/:title', verifyToken, verifyAdmin, updateEvent)


export default eventRouter