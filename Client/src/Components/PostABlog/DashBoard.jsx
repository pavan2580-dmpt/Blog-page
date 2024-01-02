import React, {useEffect,useRef } from 'react'
import axios from "axios"
import "./DashBoard.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import NotFound from '../Error/NotFound';
import Cookies from "js-cookies"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const modules ={
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],

    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ indent: '-1'}, { indent: '+1' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],

    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}
function DashBoard() {

  const HideButton = useRef(null);
// =============================================
  const [heading,SetHeading] = useState('');
  const [summary,SetSumary] = useState('');
  const [files,SetFile] = useState('');
  const [text,SetText] = useState('');
  const [Logined,SetLogined] = useState(false)
  const [jsonToken,SetjsonToken] = useState('')
  // =========================

useEffect(()=>{
    SetLogined(Cookies.getItem('Logined'))
    SetjsonToken(Cookies.getItem('jwtToken'))
},[])
// =======================
 async function HandlePostRequest(e){
    e.preventDefault();
    toast('hello')
   if(HideButton.current)
   HideButton.current.style.display = "none";
    SetjsonToken(Cookies.getItem('jwtToken'))
    const Data = new FormData();
    Data.set('heading',heading)
    Data.set('summary',summary)
    Data.set('file',files[0])
    Data.set('text',text);
    Data.set('jwtToken',jsonToken);
    if(heading.length ===0 || summary.length ===0 || files.length ===0 || text.length ===0){
      toast("All fields are required....",{theme:'dark'});
    }
    else{  
   await axios.post('http://localhost:3000/blogs',Data).then(
    (res)=>{
      toast("done")
     window.location.href = "/";
    }
   ).catch(
    (err)=>{
      console.log("error....",err)
    }
   )
  }
 }
//  ============================================
  return (
   <>
        {
          Logined? (
            <>
            <ToastContainer/>
            <div className="DashBoard_container">
              <h1 style={{textAlign:'center',marginBottom:"30px"}}>
                Create a Blog
              </h1>
              <form className='Post_Blog_form' onSubmit={HandlePostRequest} >
                <input type="text" placeholder='Enter the title' className='title_input' onChange={(e)=>{SetHeading(e.target.value)}}/>
                <textarea  cols="30" rows="150" placeholder='Enter the summary' className='textArea_Dashboard' onChange={(e)=>{SetSumary(e.target.value)}}></textarea>
                <input type="file"  className='input_file_blog' onChange={(e)=>{SetFile(e.target.files)}}/>                
                {files[0] && (
                   <center><img src={URL.createObjectURL(files[0])} alt="image" width={'150px'}/></center> 
                  )}           
                <ReactQuill  modules={modules} className='reacrQuill_adjustment'  onChange={(val)=>{SetText(val)}}/>        
              <button type="submit" className='Upload_Post_button' >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
              </svg>
            </div>
          </div>
          <span>Post</span>
        </button>
        
              </form>
            </div>
            
            </>
  ): (
    <NotFound/>
  )
        }
   
   </>

  )
}

export default DashBoard