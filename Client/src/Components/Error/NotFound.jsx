import React from 'react'
import "./NotFound.css"
function NotFound() {
  return (
    <section className="page_404">
    <div className="container">
      <div className="row"> 
      <div className="col-sm-12 ">
      <div className="col-sm-10 col-sm-offset-1  text-center">
      <div className="four_zero_four_bg">
        <h1 className="text-center ">404</h1>
      
      
      </div>
      
      <div className="contant_box_404">
      <h3 className="h2">
      Look like you're lost
      </h3>
      
      <p>the page you are looking for not avaible!</p>
      
      <button className='gotohome' onClick={()=>{window.location.href='/'}}>Go to Home</button>
    </div>
      </div>
      </div>
      </div>
    </div>
  </section>
  )
}

export default NotFound