import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../index.css'
import '../css/cart-preview.css'

const CartButton = ({ totalPrice }) => {
  const formattedPrice = typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00';
  return (<button className="button primary cart">Cart - ${formattedPrice}</button>);
};

export default function CartPreview({ isOpen, onClose, cartItems }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <motion.div
        className={'shopping-cart-preview'}
        initial={{ x: '100%' }} 
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.1 }}
      >
        <div className="cart-content">
          <div className="header">
            <h3>Shopping Cart</h3>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="item-details">
                  <img src={require(`../images/covers/${item.imageUrl}`)} alt="Book Cover" />
                  <div className="items">
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='cart-button'>
        <Link to='/CartPage'><CartButton totalPrice={totalPrice} /></Link>
        </div>
      </motion.div>
      {isOpen && <motion.div
          className="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        ></motion.div>}
    </div>
  );
}