import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Temukan Rekomendasi Makanan Pendamping ASI Sekarang</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque vitae perspiciatis, suscipit molestias officiis aliquam optio? Voluptatum pariatur facere voluptate.</p>
        <Link to='/recommend'><button>Dapatkan Rekomendasi</button></Link>
      </div>
    </div>
  )
}

export default Header
