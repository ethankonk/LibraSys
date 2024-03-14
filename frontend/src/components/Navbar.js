import React from 'react'
import '../index.css'
import logo from '../images/logo.png'
import { FaRegUser } from "react-icons/fa"
import { Link } from 'react-router-dom'

export default function Navbar ({ cart, inCart, toggleCart, toggleProfile, isLoggedIn, background, buttons }) {
    const handleMenuClick = () => {
        console.log(inCart)
    }

    return (
        <div className={`top-navbar ${background}`}>
          <div className="logo-container">
            <img className="logo" src={ logo } />
          </div>  
          <div className="checkout-cart">
            { buttons && (isLoggedIn ? 
            <button className='profile-button' onClick={()=>toggleProfile()}><FaRegUser className='profile' /></button>
            :
            <Link to='/LoginPage'>
              <button className='button login'>Login</button>
            </Link>) 
            }
            {buttons && <button className='button primary' onClick={()=>toggleCart()}>Cart ({cart})</button>}
          </div>
        </div>
    );
}