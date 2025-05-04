import express  from 'express';
import { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser } from '../controllers/UserController.js'


const userRouter = express.Router();


userRouter.get('/', getAllUsers)
userRouter.get('/:email', getUserByEmail)
userRouter.post('/', createUser)
userRouter.put('/:email', updateUser)
userRouter.delete('/:email', deleteUser)


export default userRouter
