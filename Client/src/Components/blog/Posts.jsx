import React, { useEffect, useState } from 'react'
import "./Posts.css"
import axios from 'axios'
import BlogLoder from "../Loaders/BlogLoader"
import {Navigate, useNavigate} from "react-router-dom"

function Posts() {
  const navigate = useNavigate()
    const[Datas,Setdata] = useState([])
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:3000/posts')            
           
              const tttttt = response.data
         await Setdata(tttttt);
         
          
          
          
        } catch (error) {
          console.error("Error fetching data:");
        }
      }
      fetchData(); 
    }, [Datas]); 
   
  return (
    <>
  {
  Datas.length !== 0 ? (
    Datas.map((fromDB) => (
      <div className="card_container_blog"  key={fromDB.id}  onClick={()=>{
        navigate('/details',{state:{details:fromDB}})
      }}>
        <div className="image" >
          <img
            src={`http://localhost:3000/${fromDB.image}`}
            alt="image"
            width={'400px'}
            height={'300px'}
         
          />
        </div>
        <div className="card_blog_content" >
          <h1 >{fromDB.heading}</h1>
          <h5 >Posted on: {fromDB.updatedAt}</h5>
          <h5 >Posted by :{fromDB.first} {fromDB.last}</h5>
          <p >{fromDB.summary}</p>
        </div>
      </div>
    ))
  ) : (

    <BlogLoder/>

  )
}

    </>
  )
}

export default Posts