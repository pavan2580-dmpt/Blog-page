import { createContext, useState } from 'react'
import Login from "../Components/Auth/login/Login"
import Register from "../Components/Auth/register/Register"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import DashBoard from './PostABlog/DashBoard'
import NavBar from './navBar/NavBar'
import Blog from './blog/Blog'
import NotFound from './Error/NotFound'
import BlogDetails from './Blog_details/BlogDetails'
import UserInfo from './DashBoardUser/UserInfo'
import ErrorBoundary from './HandleErrors/ErrorBoundary'
import Edit from './Update/Edit'

function App() {


  return (
    <>
<ErrorBoundary>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<NavBar/>}>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/dashBoard' element={<DashBoard/>}/>
                <Route path='/' element={<Blog/>}/>
                <Route path='/details' element={<BlogDetails/>}/>
                <Route path='/edit/:id' element={<Edit/>}/>             
                <Route path='/userinfo' element={<UserInfo/>}/>
      
    </Route>
      
    <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </ErrorBoundary>
    </>
  )
}

export default App
