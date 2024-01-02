const mongoose = require('mongoose');

const Posts = mongoose.Schema(
    {
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
        heading:{
            type:String,
            required:true
        },
        summary:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        text:{
                type:String,
                required:true
        }
    },{
        timestamps:true
    }
)


module.exports  = mongoose.model('BlogPosts',Posts)