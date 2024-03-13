import React from 'react'
import '../index.css'
import logo from '../images/logo.png'
import { FaRegUser } from "react-icons/fa";

export default function Navbar ({ cart, inCart, clearCart, toggleCart }) {
    const handleMenuClick = () => {
        console.log(inCart)
    }

    return (
        <div className="top-navbar">
          <div className="logo-container">
            <img className="logo" src={ logo } />
          </div>  
          <div className="checkout-cart">
            <button className='profile-button'><FaRegUser className='profile' /></button>
            <button className='button primary' onClick={()=>toggleCart()}>Cart ({cart})</button>
          </div>
        </div>
    );
}