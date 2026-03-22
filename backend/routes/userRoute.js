import express from 'express';
import { adminLogin } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/login',adminLogin);


export default userRouter;  