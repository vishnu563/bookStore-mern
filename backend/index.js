import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {PORT,mongoDBURL} from "./config.js";
import bookRouter from "./routes/booksRoute.js";


const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    return res.status(200).send("HELLO")
})

app.use('/books',bookRouter);


mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err)=>{
        console.log(err);
        
    })
