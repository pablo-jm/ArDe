import WorkModel from '../models/WorkModel.js'



export const getAllWorks = async(req, res) => {
    try{
        const works = await WorkModel.findAll({
            where: { state: 'selling' }
        });
        res.json(works);
    }catch(error){
        res.json({message: error.message});
    }
}


export const getWorkByTitle = async(req, res) => {
    try{
        const work = await WorkModel.findOne({where:{title: req.params.title}});
        res.json(work);
    }catch(error){
        res.json({message: error.message});
    }
}


export const createWork = async(req, res) => {
    const { title, description, image_url, price, dimensions } = req.body;

    if (!title || !image_url || !price || !description || !dimensions) {
        return res.status(400).json({ message: 'Fields: title, description, image, price y dimensions are requires.' });
    }

    try{
        const existingWork = await WorkModel.findOne({ where: { title } });
        if (existingWork) {
            return res.status(400).json({ message: 'Work was already created.' });
        }

        const newWork = await WorkModel.create({ title, description, image_url, price, dimensions });
        if(!newWork || !newWork.id){
            return res.status(500).json({ message: 'Error adding work, try again later.' });
        }

        res.status(201).json({
            message: 'Work created successfully!',
            work: newWork
        });
    }catch(error){
        res.json({message: error.message});
    }
}



export const updateWork = async (req, res) => {
    try {
        const { state } = req.body;
        
        await WorkModel.update(req.body, { where: { title: req.params.title } });
        
        if (state === 'sold') {
            res.json({ message: 'Obra sin stock.' });
        } else {
            res.json({ message: 'Work updated successfully!' });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

