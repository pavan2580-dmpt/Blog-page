import React, {  useState } from 'react'
import "./login.css"
import {FaUserAlt} from "react-icons/fa"
import {BiSolidLockAlt} from "react-icons/bi"
import saly from "../assets/Saly-12.png"
import {Link} from "react-router-dom"
import axios from 'axios'
import Cookies from "js-cookies"
import Loader from '../../Loaders/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [email,SetEmail] = useState('');
    const [pass,SetPass] = useState('');
    const [ Loaderon,SetLoaderon] = useState(false)
    const [response,SetResponse] = useState(false)
    
    
   async function HandelLogin(e){
    SetLoaderon(true)
        e.preventDefault();
       const data =  await axios.post('http://localhost:3000/login',{
        email:email,
        pass:pass
       })
              

       if(data.data === "wrong pass")
       {
        SetLoaderon(false)
        toast("Wrong Password");
        
       }
       else if(data.data === "no user found"){
        SetLoaderon(false)
        toast("Invalid Email");
    
       
       }
       else{
        Cookies.setItem("jwtToken",data.data,{expires :1})
        Cookies.setItem('CheckEmail',email);
        Cookies.setItem('Logined',true,{expires:1})
         SetLoaderon(false)
         toast("Login Successful");
       window.location.href='/'
       }
      
      
        
    }



  return (
    <>
    
    <div className="login_container">
    <ToastContainer />
       {
        Loaderon ? ( <Loader/>) : (
            <div className="sub_login_container">
            <div className="Login_image"
            >
                <img src={saly} alt="login"  width={"500px"}/>
            </div>
            <div className="Login_content">
            
            <form onSubmit={HandelLogin}>
               <div className="LOGIN_Data">
               <h1 className='log_txt'>
                    Log In
                </h1>
               
                <div className="logmail">
                <label htmlFor="LogMail" style={{cursor:'pointer'}}><FaUserAlt size={30}/></label>
                    <input type="email"  id="LogMail" placeholder='Enter your email' required onChange={(e)=>{SetEmail(e.target.value)}} />
                </div>
                <div className="logpass">
                    <label htmlFor="LogPass" style={{cursor:'pointer'}}><BiSolidLockAlt size={40}/></label>
                    <input type="password" placeholder="Enter Password" id="LogPass" required onChange={(e)=>{SetPass(e.target.value)}} />
                </div>
                <p className='create_new_account_txt'>
                    <Link to={"/register"}>
                    Create an account
                    </Link>

                </p>
                <input type='submit' value={"Log In"} className='LOG_BTN'/>
               </div>
               </form>
            </div>
        </div>

        )
       }
       
    </div>
    
    </>
  )
}

export default Login