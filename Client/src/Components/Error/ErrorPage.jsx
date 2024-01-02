import React from 'react'
import "./ErrorPage.css"
import image from "../Error/assets/500InternalServerError.gif"

function ErrorPage() {
  return (
    <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <span>
      <img src={image} alt='error page' />
      <h1>
        Please reload and try again...
      </h1>
      </span>
    </div>
  )
}

export default ErrorPage