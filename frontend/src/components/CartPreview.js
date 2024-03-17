import React, { useEffect, useState } from 'react';
import { FaTimes, FaRegTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../index.css';
import '../css/cart-preview.css';

const CartButton = ({ totalPrice }) => {
  const formattedPrice = typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00';
  return (<button className="button primary cart">Cart - ${formattedPrice}</button>);
};

export default function CartPreview({ isOpen, onClose, cartItems, handleDelete }) {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    if(cartItems.length > 0){
      fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/fetchBorrowedBooks.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems), // Sending only the book IDs
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch books data');
          }
          return response.json();
        })
        .then(data => {
          console.log(data)
          setBooksData(data);
        })
        .catch(error => {
          console.error('Error fetching books data:', error);
        });
    } else {
      setBooksData([])
    }
  }, [cartItems]); 

  const totalPrice = booksData.reduce((total, book) => total + book.price, 0);

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
            {booksData.map((book) => (
              <li key={book.id}>
                <div className="item-details">
                  <img src={require(`../images/covers/${book.imageUrl}`)} alt="Book Cover" />
                  <div className="items">
                    <p>{book.title}</p>
                    <p>${book.price}</p>
                  </div>
                  <button className='button secondary trash' onClick={()=>handleDelete(book.id)} ><FaRegTrashAlt /></button>
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
