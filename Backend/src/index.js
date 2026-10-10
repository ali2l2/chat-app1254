import express from "express"
import authRouters from "./routes/auth.route.js"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";



dotenv.config()


const app = express();
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouters)
app.listen(PORT,()=>{
    console.log("server is running")
    connectDB()
})