import express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { getAllEvents, getEventByTitle, createEvent, updateEvent, deleteEvent } from '../controllers/EventController.js'

const eventRouter = express.Router();


eventRouter.get('/', getAllEvents)
eventRouter.get('/:title', getEventByTitle)
eventRouter.post('/', verifyToken, verifyAdmin, createEvent)
eventRouter.put('/:title', verifyToken, verifyAdmin, updateEvent)
eventRouter.delete('/:title', verifyToken, verifyAdmin, deleteEvent)


export default eventRouter