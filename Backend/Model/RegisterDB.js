const mongoose = require("mongoose");

const UserRegisterdData = mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
},
    {
        timestamp:true,
    }
)


module.exports = mongoose.model("Blog",UserRegisterdData);