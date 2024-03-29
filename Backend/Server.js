const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello..")
})
app.use('/uploads', express.static(__dirname + "/uploads"));
mongoose.connect('process.env.MOGO_URL').then(
    ()=>{
        console.log("Sucessfully connected to the dataBase ")
    }
).catch(
    (err)=>{
        console.log("Error occured while connecting to data base..",err)
    }
)

app.use("/",require('./routers/Routes'))
app.listen(3000,()=>{console.log("Server is running  3000...")})
