import WorkModel from '../models/WorkModel.js'


//getAllWorks
export const getAllWorks = async(req, res) => {
    try{
        const works = await WorkModel.findAll();
        res.json(works);
    }catch(error){
        res.json({message: error.message});
    }
}

//getWorkByTitle
export const getWorkByTitle = async(req, res) => {
    try{
        const work = await WorkModel.findOne({where:{title: req.params.title}});
        res.json(work);
    }catch(error){
        res.json({message: error.message});
    }
}

//createWork
export const createWork = async(req, res) => {
    try{
        await WorkModel.create(req.body);
        res.json({message: 'Work created succesfully'});
    }catch(error){
        res.json({message: error.message});
    }
}

//updateWork
export const updateWork = async(req,res) =>{
	try{ 
			await WorkModel.update(req.body, { where:{title:req.params.title}})
			res.json({message: "Work updated successfully!"})
		}
	catch(error){
			res.json({message: error.message})
		}
	}

//deleteWork
export const deleteWork = async (req, res) => {
	try{
			await WorkModel.destroy({ where:{title:req.params.title}})
			res.json({message: "Work deleted successfully!"})
	} catch{
			res.json({message: error.message})
	}
}