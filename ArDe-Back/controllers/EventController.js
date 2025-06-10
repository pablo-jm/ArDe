import EventModel from '../models/EventModel.js'


export const getAllEvents = async(req, res) => {
    try{
        const events = await EventModel.findAll();
        res.json(events);
    }catch(error){
        res.json({message: error.message});
    }
}


export const updateEvent = async(req,res) =>{
	try{ 
			await EventModel.update(req.body, { where:{title:req.params.title}})
			res.json({message: "Event updated successfully!"})
		}
	catch(error){
			res.json({message: error.message})
		}
	}

