import express from 'express'
// import Router from './routes/Router.js'
import 'dotenv/config'
import userRouter from './routes/user.router.js'
import categoryRouter from './routes/category.router.js'
import jobRouter from './routes/job.router.js'
import applyJobRouter from './routes/applyJob.router.js'
import './db/index.js'
const app = express()
const port = 3000
//Middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send(process.env.DATABASE_URL)
})

//Main Router
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/applyJob', applyJobRouter)

app.listen(port, () => {
  console.log(`App berjalan di port: ${port}`)
})