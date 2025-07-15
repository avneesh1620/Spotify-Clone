import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Database/db.js'
import connectCloudinary from './Config/cloudinary.js'

dotenv.config()

const app = express()

const port = process.env.PORT
connectCloudinary()

//using middlewares
app.use(express.json())
app.use(cors())

//importing song routes
import songRoutes from './Routes/songRoutes.js'

//importing album routes
import albumRoutes from './Routes/albumRoutes.js'

//using song Routes
app.use('/api/song', songRoutes)

//using album Routes
app.use('/api/album', albumRoutes)

app.get('/', (req, res) => {
    res.send("Server is Running")
})

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
    connectDB()
})

