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
    const { title, description, image_url, price, dimensions } = req.body;

    if (!title || !image_url || !price || !description || !dimensions) {
        return res.status(400).json({ message: 'Los campos: título, descripción, imagen, precio y dimensiones son obligatorios.' });
    }

    try{
        const existingWork = await WorkModel.findOne({ where: { title } });
        if (existingWork) {
            return res.status(400).json({ message: 'La obra ya fue creada.' });
        }

        const newWork = await WorkModel.create({ title, description, image_url, price, dimensions });
        if(!newWork || !newWork.id){
            return res.status(500).json({ message: 'Error al crear la obra, inténtelo de nuevo.' });
        }

        res.status(201).json({
            message: 'Obra creada exitosamente.',
            work: newWork
        });
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