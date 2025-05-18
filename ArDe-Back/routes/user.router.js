import express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser } from '../controllers/UserController.js'


const userRouter = express.Router();


userRouter.get('/', getAllUsers)
userRouter.post('/', createUser)

userRouter.get('/:email', verifyToken, getUserByEmail)
userRouter.put('/:email', verifyToken, updateUser)
userRouter.delete('/:email', verifyToken, deleteUser)


export default userRouter
