import express from 'express'
import { createCategory, allCategory, singleCategory, updateCategory, deleteCategory} from '../controllers/category.controller.js'    
import authMiddleware from '../middleware/auth.js'

const categoryRouter = express.Router()

categoryRouter.post('/', authMiddleware, createCategory)
categoryRouter.get('/', allCategory)
categoryRouter.get('/:id', singleCategory)
categoryRouter.put('/:id', authMiddleware, updateCategory)
categoryRouter.delete('/:id', authMiddleware, deleteCategory)



export default categoryRouter
