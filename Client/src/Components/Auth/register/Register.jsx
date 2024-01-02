import React, { useState } from 'react'
import "./register.css"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
// import { signal } from "@preact/signals-react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Register() {

const [first,Setfirst] = useState('')
const [last,Setlast] = useState('')
const [email,Setemail] = useState('')
const [pass,Setpass] = useState('')
const [ConPass,SetConpass] = useState('')
  const navigate = useNavigate()
   async function HandleRegister(e){
     e.preventDefault();
     if(pass != ConPass){
        alert("Pass word not matched...")
     }else{
        await axios.post("http://localhost:3000/register",{
          first:first,
          last:last,
          email:email,
          pass:pass
        }).then((res)=>{
          if(res.data === "user already exists"){
            toast("Email Already in use")
          }
          else if(res.data === "All fields are required"){
            toast("FIll All Fields")
          }
          else if(res.data === "failed.."){
            navigate('/*')
          }
          else{
          toast("sucessfully Registred",{position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",});
          navigate('/login')
      } })
      
     }
     }


  return (
    <>
    <div className="register_container">

        <div className="sub_divisions_register">
          <ToastContainer/>
            <h1 className='create'>
              Create new account <span className='dot'>.</span>
            </h1>
      <p className='para'>
        Already A Menber ? <span className='Log'>
          <Link to={'/login'}>
          Log in 
          </Link>
          </span>
      </p>
      <form  className='form' onSubmit={HandleRegister}>
        <div className='Name' >
          <input type="text"  placeholder='First Name'className='name' onChange={(e)=>{Setfirst(e.target.value)}}/>
          <input type="text" placeholder='Last Name'className="name" onChange={(e)=>{Setlast(e.target.value)}} />
        </div>
        <div className="Data">
        <input type="email" placeholder='Email' className='data' onChange={(e)=>{Setemail(e.target.value)}} />
        <input type="password"  placeholder='password' className='data' onChange={(e)=>{Setpass(e.target.value)}} />
        <input type="text" placeholder='Confrom Password' className='data' onChange={(e)=>{SetConpass(e.target.value)}} />
        </div>
        <input type="submit" value="Submit"  className='Submit_btn' />
      </form>
        </div>
    </div>
    </>
  )
}

export default Register