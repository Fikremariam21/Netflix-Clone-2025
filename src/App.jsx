import { useState } from 'react'

import './App.css'
import Home from './Pages/Home/Home.jsx'
import {Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'

function App() {

  return (
    <>
       <div className='App'>
        <Routes> 
          <Route path='/' element={<Home/>} />
          <Route path='login' element={<Login/>} />
        </Routes>
       </div>
      
    </>
  )
}

export default App
