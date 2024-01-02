import React, { useEffect, useRef, useState } from 'react'
import "./UserInfo.css"
import Cookies from "js-cookies"
import axios, { AxiosHeaders } from 'axios'
import Stillworking from './Stillworking'
import "./UserInfo.css"
import NotFound from '../Error/NotFound'
import {AiOutlineHome,AiFillDelete,AiOutlineSend} from "react-icons/ai"
import {RiLogoutBoxRLine} from "react-icons/ri"
import {Link,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BiEdit} from "react-icons/bi"
function UserInfo() {
  const nav= useNavigate()

// ===================================================

const showDelete = useRef(null)
const showDelete1 = useRef(null)
//  ============================================
  const [Login,SetLogin] = useState(false)
  const [user,SetUser ] = useState([]);
  const [Bloged,SetBloged] = useState([]);

useEffect(
    ()=>{
        FETCH()
        const llll= Cookies.getItem('Logined')
       SetLogin(llll );
       data();
},[])

function HandleLogout(){
  Cookies.removeItem('jwtToken')
  Cookies.removeItem('Logined')
  window.location.href = '/'
  
}

const data = async () => {
  try {
    const emailData = Cookies.getItem('CheckEmail');
      const response = await axios.post('http://localhost:3000/count', {
          email: emailData
      });
      SetBloged(response.data);
  } catch (error) {      
      console.error('An error occurred:',error);
  }
}

async function FETCH(){
  try {
    const token = Cookies.getItem('jwtToken');
    const response =await axios.post('http://localhost:3000/getsingleuserdata', null, {
      headers: {
          'x-token': token,
      }
    
  });
const tttttttttttttttt = response.data

  SetUser(tttttttttttttttt); 
  } catch (error) {
    console.error('Error fetching data:');
  }
}
// ============================
async function HandleDelete(val){
  const Blodid = val;
  console.log(Blodid)
  const response = await axios.post('http://localhost:3000/delete',{
    id:Blodid
  }).then(
    (res)=>{
      toast(res.data);
    }
  )
 

}
  return (
  <>
          {
            Login ? (
              <div className="usercontainerbackgroungimage">
                <ToastContainer/>
                        <div className="userinfocontainer">
                               <div className="greetingsSection">
                                     <h1> welcome {user.last}</h1>
                                 </div>
                                 <div className="userinfocontainerwithsidebarandposts">
                                 <div className="sideBarMenu">
                                    <Link to={'/'} className='Link'>
                                    <div className="sideHome">
                                      <AiOutlineHome size={35}/> Home
                                    </div>
                                    </Link>
                                    <Link to={'/dashBoard'}  className='Link' >
                                    <div className="sideposts">
                                      <AiOutlineSend  size={35}/> Post
                                    </div>
                                    </Link>
                                    <div className="sideLogout" onClick={HandleLogout}>
                                      <RiLogoutBoxRLine size={35}/> Logout
                                    </div>
                                 </div>
                                 <div className="userinfoPoststotal">
                                 <div className="userinfosss">
                                 <h1 className='UserNameH1'>
                                    First Name : {user.first}
                                  </h1>
                                  <h1 className='UserLastH1'>
                                    last Name : {user.last}
                                  </h1>
                                  <h1 className='UserEmailH1'>
                                    Email : {user.email}
                                  </h1>
                                  <h1 className='UserLastH1'>
                                    No of Posts : {Bloged.length}
                                  </h1>
                                 </div>

                                  <div className='userinfo_more_about_posts'>
                                  {
                                      Bloged.map((val) => (                                    
                                        <div className="inner_div" key={val.image} 
                                        onMouseEnter={
                                          ()=>{
                                            if(showDelete.current)
                                            {                                            
                                              showDelete.current.style.display="block"
                                              showDelete1.current.style.display="block"
                                            }                                        
                                            }
                                            }
                                             onMouseLeave={
                                              ()=>{
                                                if(showDelete.current)                                                
                                                {showDelete.current.style.display="none"
                                                showDelete1.current.style.display="none"
                                              }
                                              }
                                                }             
                                                > 
                                             <div className="show_the_options" >
                                              
                                             <span className='edit_icon_post' ref={showDelete}>                                               
                                               <BiEdit size={30} onClick={()=>{ nav(`/edit/${val._id}`,{state:{details:val}})}}/>                                              
                                                </span>
                                        <span className="delete_icon_post" ref={showDelete1} >
                                                                                 
                                          <AiFillDelete size={30} onClick={()=>HandleDelete(val._id)}  />                                           
                                          
                                          </span> 
                                              </div>                                        
                                          <img src={`http://localhost:3000/${val.image}`} alt="image"style={{ width:'300px',height:'300px'}}  key={val.image} />
                                          <div className="inner_span__">{val.heading}</div>
                                        </div>
                                      ))
                                  }

                                  </div>
                               
                                  {/* <div className="user-blogs-dataa">
                                        <Stillworking/>
                                  </div> */}
                                 </div>
                                 
                                 </div>
                                 
                          </div>
                </div>
            ):(
              <NotFound/>
            )
          }
  
  
  
  </>
  )
}

export default UserInfo