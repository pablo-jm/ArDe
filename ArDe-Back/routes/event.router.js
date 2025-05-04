import express  from 'express';
import { getAllEvents, getEventByTitle, createEvent, updateEvent, deleteEvent } from '../controllers/EventController.js'

const eventRouter = express.Router();


eventRouter.get('/', getAllEvents)
eventRouter.get('/:title', getEventByTitle)
eventRouter.post('/', createEvent)
eventRouter.put('/:title', updateEvent)
eventRouter.delete('/:title', deleteEvent)


export default eventRouter