const express = require('express');
Routers = express.Router();
const mongoose = require('mongoose');
const Blog = require("../Model/RegisterDB")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Validation = require("../validation/verfiy")
const multer  = require('multer')
const upload = multer({ dest: 'uploads' })
const fs = require('fs')
const BlogPosts = require("../Model/Posts");


// ========================================================================
// -------------------login a User ------------------------------------------

Routers.route('/login').post(
    async (req,res)=>{
        const {email,pass} = req.body;
        if(!email || !pass){
            res.send("All fields are manditotary ...");
        }
        else{
            const Login = await Blog.findOne({email});
            if(!Login){
                res.send("no user found");
            }else{
                // --comp pass---
                if(await bcrypt.compare(pass,Login.pass)){
                    const KEY = "@#$%^&*()";
                    const JsonToken = jwt.sign({
                        user:{
                            id:Login.id,
                            email:Login.email
                        }
                    },KEY,{expiresIn:"1d"})
                    res.status(200).send(JsonToken)
                }
                else{
                    res.send("wrong pass")
                }
            }
        }
})

// ============================================================================================
// --------------------Register user Route ---------------------------------
Routers.route("/register").post(
   async (req,res)=>{
    const {first,last,email,pass} = req.body;
    if(!first || !last || !email || !pass){
        res.send("All fields are required")
    }else{
        const Find  = await Blog.findOne({email})
        if(Find){
            res.send("user already exists")
        }
        else{

            // ------------Hash password----------
            const HashPass = await bcrypt.hash(pass,10)
        const Posting =await Blog.insertMany({
            first:first,
            last:last,
            email:email,
            pass:HashPass
        })
        if(Posting){
            res.status(200).send("Data posted sucessfully in db...")
        }
        else{
            res.send("failed..")
        }
    }
}}
)
// ===============================================================
// -------------------Posts-----------------------------

Routers.route("/posts").get(
   async (req,res)=>{
    const BlogsData =await BlogPosts.find({})
    res.send(BlogsData)
})

// ===============================================================
// ----------------Blogs---------------------------------


Routers.route("/blogs").post(upload.single('file'),async (req, res) => {
   if(!req.file){
    res.send("error no file")
   }
   const {originalname,path} = req.file;
   const parts = originalname.split('.');
   const ext = parts[parts.length -1 ]
   const newPath = path+ '.'+ext 
   fs.renameSync(path,newPath);
    const {heading,summary,text,jwtToken} = req.body;
    const decode = jwt.verify(jwtToken,"@#$%^&*()");
    datas = decode.user
    const UserName = await Blog.findOne({email:datas.email})
    const Postblog = await BlogPosts.insertMany({
            first:UserName.first,
            last:UserName.last,
            email:UserName.email,
            heading:heading,
            summary:summary,
            image:newPath,
            text:text
    })
    res.status(200).send("posted Blog into DB.") 
});


// ===============================================================
// -------------delete all bolgs -----------------------
Routers.route('/delete').post(async (req, res) => {
    try {
      const id = req.body.id;        
      if (!id) {
        return res.status(400).json({ error: 'Invalid ID provided' });
      }
      const result = await BlogPosts.findByIdAndRemove(id);
        if (!result) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
    res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// ===============================================================
// ----------------count Posts ------------------

Routers.route('/count').post(
    async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            const blogPosts = await BlogPosts.find({ email });
            res.status(200).json(blogPosts);
        } catch (error) {
            console.error('Error in /count route:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
);



// ===============================================================
// -----------Validate-------------------
Routers.post('/getsingleuserdata', async (req, res) => {   
        const token = req.header('x-token'); 
        if (!token) {
            return res.status(403).send("No token found"); 
        } 
        else {       
                const decode = jwt.verify(token, "@#$%^&*()");
                if (!decode) {
                    return res.send("no decode"); 
                }
                const USERDATA = decode.user.email;
                const getAbout = await Blog.findOne({ email: USERDATA });
                if (getAbout) {
                    return res.send(getAbout); 
                } else {
                    return res.send("no user"); 
                }

            
        
    } 
});
// =====================================================================================
// -----------------------Update the posted blog route---------------------------------

Routers.route('/updateTheBlog/:id').put(upload.single('file'), async (req, res) => {
    try {
      let newPath = null;
  
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
      }
  
      const { heading, summary, text } = req.body;
  
      if (!heading && !summary && !text) {
        return res.status(200).send("Fields are empty");
      }
  
      const updateData = {};

      if (heading) {
        updateData.heading = heading;
      }
      if (summary) {
        updateData.summary = summary;
      }
      if (text) {
        updateData.text = text;
      }
      if (newPath) {
        updateData.image = newPath;
      }
      const PosiId = req.params.id
      const result = await BlogPosts.updateOne({ _id: PosiId }, updateData)
    
  
    //   if (heading) {
    //     SinglePost.heading = heading;
    //   }
    //   if (summary) {
    //     SinglePost.summary = summary;
    //   }
    //   if (text) {
    //     SinglePost.text = text;
    //   }
 
    //   if (newPath) {
    //     SinglePost.image = newPath;
    //   }
  
    //   await SinglePost.save();
      res.status(200).send("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(200).send("Internal Server Error");
    }
  });


module.exports = Routers