import React, { useEffect, useState } from 'react'
import "./NavBar.css"
import { Outlet,Link, useNavigate } from 'react-router-dom'
import Cookies from "js-cookies"
function NavBar() {
  const [cookieTrue,SetcookieTrue] = useState(false)
  useEffect(() => {
    const cookieToken = Cookies.getItem('jwtToken'); 
    if (cookieToken) {
        SetcookieTrue(true);
      
    } else {
        SetcookieTrue(false);
        
    }
}, []);

function HandleLogout(){
  Cookies.removeItem('jwtToken')
  Cookies.removeItem('Logined')
  Cookies.removeItem('CheckEmail')
  window.location.href = '/'
  
  
}
  return (
   <>
   
   <div className="navbar_container">
    <Link to={"/"} className='Link'>
    <h1 className="logo">Blog</h1>
    </Link>

    
   {
      cookieTrue ? (
        <div className='when_login_show_routers'>
          <Link to={'/userInfo'} className='UserInfo'  style={{textDecoration:'none',color:'none'}}>
          <h2>
            DashBoard
          </h2>
          </Link>
          <Link to={'/dashBoard'} style={{textDecoration:'none',color:'none'}}>
          <h2>
            Upload Post
          </h2>
            </Link>
         
        <h2 className="routes" style={{cursor:'pointer'}} onClick={HandleLogout}>
         
        Log Out
        </h2>
        </div>
      ):(

        <div className="signup_login">
          <Link to={'/login'} className='Link'>
           <h2 className="routes">         
          Log In
        </h2>
        </Link>
        <Link to={'/register'} className='Link'>
        <h2 className="routes">         
          Sign Up
        </h2>
        </Link>
        </div>
        
      )
    }
   
   </div>
   <Outlet/>
   </>
  )
}

export default NavBar