import { useState, useEffect } from 'react'
import '../css/cart-page.css'

import CartItem from '../components/CartItem'
import Navbar from '../components/Navbar'
// import PaymentComponent from '../components/Payment';

export default function CartPage ({ borrowedBookIds, removeFromCart, handleCheckout }) {
  const [booksData, setBooksData] = useState([])
  const discount = 0.00;

  useEffect(() => {
    if(borrowedBookIds.length > 0){
      fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/fetchBorrowedBooks.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(borrowedBookIds), 
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
  }, [borrowedBookIds]); 

  const subtotal = booksData.reduce((total, book) => total + book.price, 0);
  const total = subtotal-discount

  return (
    <div>
      <Navbar buttons={false} background='black' />
      <div className='cart-container'>
        <h1>Your Cart</h1>
          <div className='cart-box'>
            <div className="cart-items">
              {booksData.map(book => (
                <CartItem 
                  key={book.id} 
                  item={book} 
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            <div className='payment-container'>
              <h2>Payment</h2>
              <div className='payment-box'>
                <div className='payment-titles'>
                  <p>Subtotal</p>
                  <p>Discount</p>
                  <p><strong>Total</strong></p>
                </div>
                <div className='payment-numbers'>
                  <p>{`\$${subtotal.toFixed(2)}`}</p>
                  <p>{`\$${discount.toFixed(2)}`}</p>
                  <p><strong>{`\$${total.toFixed(2)}`}</strong></p>
                </div>
              </div>
              <div className='checkout-button-container'>
                <button className='button primary checkout' onClick={()=>handleCheckout()}>Checkout - ${total.toFixed(2)} CAD</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}


