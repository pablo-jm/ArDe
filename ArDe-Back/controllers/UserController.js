import UserModel from '../models/UserModel.js'


//getAllUsers
export const getAllUsers = async(req, res) => {
    try{
        const users = await UserModel.findAll();
        res.json(users);
    }catch(error){
        res.json({message: error.message});
    }
}

//getUserByEmail
export const getUserByEmail = async(req, res) => {
    try{
        const user = await UserModel.findOne({where:{email: req.params.email}});
        res.json(user);
    }catch(error){
        res.json({message: error.message});
    }
}

//createUser
export const createUser = async(req, res) => {
    try{
        await UserModel.create(req.body);
        res.json({message: 'User created succesfully'});
    }catch(error){
        res.json({message: error.message});
    }
}

//updateUser
export const updateUser = async(req,res) =>{
	try{ 
			await UserModel.update(req.body, { where:{email:req.params.email}})
			res.json({message: "User updated successfully!"})
		}
	catch(error){
			res.json({message: error.message})
		}
	}

//deleteUser
export const deleteUser = async (req, res) => {
	try{
			await UserModel.destroy({ where:{email:req.params.email}})
			res.json({message: "User deleted successfully!"})
	} catch{
			res.json({message: error.message})
	}
}