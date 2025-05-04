import EventModel from '../models/EventModel.js'


//getAllEvents
export const getAllEvents = async(req, res) => {
    try{
        const events = await EventModel.findAll();
        res.json(events);
    }catch(error){
        res.json({message: error.message});
    }
}

//getEventByTitle
export const getEventByTitle = async(req, res) => {
    try{
        const event = await EventModel.findOne({where:{title: req.params.title}});
        res.json(event);
    }catch(error){
        res.json({message: error.message});
    }
}

//createEvent
export const createEvent = async(req, res) => {
    try{
        await EventModel.create(req.body);
        res.json({message: 'Event created succesfully'});
    }catch(error){
        res.json({message: error.message});
    }
}

//updateEvent
export const updateEvent = async(req,res) =>{
	try{ 
			await OrderModel.update(req.body, { where:{title:req.params.title}})
			res.json({message: "Event updated successfully!"})
		}
	catch(error){
			res.json({message: error.message})
		}
	}

//deleteEvent
export const deleteEvent = async (req, res) => {
	try{
			await EventModel.destroy({ where:{title:req.params.title}})
			res.json({message: "Event deleted successfully!"})
	} catch{
			res.json({message: error.message})
	}
}