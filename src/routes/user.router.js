import express from 'express'
import { register, login, getUser } from '../controllers/auth.controller.js'    
import authMiddleware from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/get-user', authMiddleware, getUser)
export default userRouter