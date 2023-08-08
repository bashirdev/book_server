 import dotenv from 'dotenv'
 import mongoose from 'mongoose';
 import bodyParser from 'body-parser';
import router from './src/router.js';
import express from 'express'
import cors from 'cors'
dotenv.config()
const app = express()

function bootstrap(){
    let URI=process.env.MONGO_URI;
     mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
}

bootstrap()
//Body parser implement

app.use(bodyParser.json())
app.use(express.json());

app.use(cors())

//Routing Implement
app.use('/api/v1', router);



//Undefined route Implement
app.use('*', (req,res)=>{
    res.status(404).json({status:'fail', data:'Not Found'})
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log('App Run at 4000');
})
