import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Favorite from './pages/Favorite/Favorite'
import Recommend from './pages/Recommendation/Recommend'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'

const App = () => {
  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/favorite' element={<Favorite/>} />
        <Route path='/recommend' element={<Recommend/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
