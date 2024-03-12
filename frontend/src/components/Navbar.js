import React from 'react'
import '../index.css'
import logo from '../images/logo.png'
import { FaShoppingCart } from 'react-icons/fa';
import StarsCanvas from './StarsCanvas';

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
            <button className='button primary' onClick={()=>toggleCart()}>Cart ({cart})</button>
          </div>
        </div>
    );
}