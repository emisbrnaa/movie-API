import express from 'express'
import { createJob, updateJob, allJobs, singleJob, deleteJob, getJobsByOwner, detailJobsByOwner } from '../controllers/job.controller.js'    
import authMiddleware from '../middleware/auth.js'

const jobRouter = express.Router()

jobRouter.get('/', allJobs)                              
jobRouter.get('/user', authMiddleware, getJobsByOwner)   

jobRouter.post('/', authMiddleware, createJob)           
jobRouter.get('/:id', singleJob)                          
jobRouter.put('/:id', authMiddleware, updateJob)          
jobRouter.delete('/:id', authMiddleware, deleteJob)     
jobRouter.get('/user/:id', authMiddleware, detailJobsByOwner)

export default jobRouter
