import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt';

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
        if (req.user.email !== req.params.email) {
        return res.status(403).json({ message: 'Denied access.' });
        }
        
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
export const updateUser = async (req, res) => {
  try {

    if (req.user.email !== req.params.email) {
      return res.status(403).json({ message: 'Denied access.' });
    }

    const updateData = {};
    const { fullName, password } = req.body;


    if (fullName) {
      updateData.full_name = fullName;
    }

    if (password && password.trim() !== '') {
    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;

  } catch (error) {
    console.error('Error encrypting password:', error.message);
    return res.status(500).json({ message: 'Error encrypting password.' });
  }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    const [updated] = await UserModel.update(updateData, {
      where: { email: req.params.email }
    });

    if (updated === 0) {
      const userExists = await UserModel.findOne({ where: { email: req.params.email } });
      if (!userExists) {
        return res.status(404).json({ message: 'User not found.' });
      } else {
        return res.status(200).json({ message: 'No changes applied. Fill with different data.' });
      }
    }

    const updatedUser = await UserModel.findOne({
      where: { email: req.params.email }
    });

    res.json({
      message: 'User updated successfully!',
      user: updatedUser
    });

  } catch (error) {
    console.error('UpdateUser error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


//deleteUser
export const deleteUser = async (req, res) => {
	try{
        if (req.user.email !== req.params.email) {
        return res.status(403).json({ message: 'Denied access.' });
        }
			await UserModel.destroy({ where:{email:req.params.email}})
			if (deleted === 0) {
                return res.status(404).json({ message: 'User not found or already deleted.' });
            }
	} catch(error){
			res.json({message: error.message})
	}
}