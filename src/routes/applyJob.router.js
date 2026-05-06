import express from 'express'
import { createOrUpdateApplyJob } from '../controllers/applyJob.controller.js'    
import authMiddleware from '../middleware/auth.js'


const applyJobRouter = express.Router()

applyJobRouter.post('/', authMiddleware, createOrUpdateApplyJob)

export default applyJobRouter
