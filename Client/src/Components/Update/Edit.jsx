import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NotFound from '../Error/NotFound';
import Cookies from 'js-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import './Edit.css';
import axios from "axios"

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

function Edit() {
  const [Logined, SetLogined] = useState(false);
  const [jsonToken, SetjsonToken] = useState('');
  useEffect(() => {
    let log = Cookies.getItem('Logined')
    SetLogined(log);
    let jt = Cookies.getItem('jwtToken');
    SetjsonToken(jt);
  }, []);

  // =========================
  const location = useLocation();
  const GETDATA =  location.state.details 
  console.log(GETDATA)
  let h1= GETDATA.heading
  let p1= GETDATA.summary
  let t1 =GETDATA.text
  // =============================================
  const [heading, SetHeading] = useState(h1);
  const [summary, SetSumary] = useState(p1);
  const [files, SetFile] = useState('');
  const [text, SetText] = useState(t1);
  //   ==================================
  async function EditPost(e) {
    e.preventDefault();
    const Data = new FormData();
    Data.set('heading', heading);
    Data.set('summary', summary);
    if(files?.[0]){       
        Data.set('file', files[0]);
    }    
    Data.set('text', text);


    if (heading.length === 0 || summary.length === 0 || text.length === 0) {
      toast('All fields are required....', { theme: 'dark' });
    } else {
      // update url to update the data....
      const Updated = await axios.put(`http://localhost:3000/updateTheBlog/${GETDATA._id}`,Data).then(
        (res)=>{toast(res.data)}
      )

    }
     window.location.href='/';
  }

  //  =============================
  return (
    <>
      {Logined ? (
        <>
          <ToastContainer />
          <div className="DashBoard_container">
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Update The Blog</h1>
            <form className="Post_Blog_form" onSubmit={EditPost}>
              <input
                type="text"
                placeholder="Enter the title"
                className="title_input"
                value={heading}
                onChange={(e) => {
                  SetHeading(e.target.value);
                }}
              />
              <textarea
                cols="30"
                rows="150"
                placeholder="Enter the summary"
                className="textArea_Dashboard"
                value={summary}
                onChange={(e) => {
                  SetSumary(e.target.value);
                }}
              ></textarea>
              <input type="file" className="input_file_blog" onChange={(e) => SetFile(e.target.files)} />
              <ReactQuill modules={modules} className="reacrQuill_adjustment" value={text} onChange={(val) => SetText(val) } />
              <center>
                <button type="submit" className="bu11tton">
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Update</span>
                </button>
              </center>
            </form>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Edit;
