import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import authRoutes from './routes/auth.route.js'
const port=process.env.PORT;
const app=express();
app.use("/api/auth",authRoutes);

app.listen(port,()=>{
console.log(`Server is running at http://localhost:${port}`);
});