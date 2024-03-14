import React from 'react'
import '../css/cart-page.css'

import CartItem from '../components/CartItem'
import Navbar from '../components/Navbar'
// import PaymentComponent from '../components/Payment';

export default function CartPage () {
  const totalPrice = 100.00;
  const subtotal = totalPrice;
  const discount = 0;
  const total = subtotal - discount

  const handleCheckout = () => {
    console.log('Checkout clicked')
  };

  const cartItems = [
    {
      id: 1,
      title: 'Book 1',
      imageUrl: 'book_cover.jpeg',
      price: 20.00,
    },
    {
      id: 2,
      title: 'Book 2',
      imageUrl: 'book_cover.jpeg',
      price: 30.00,
    },
    {
      id: 3,
      title: 'Book 3',
      imageUrl: 'book_cover.jpeg',
      price: 25.00,
    },
  ]

  return (
    <div>
      <Navbar buttons={false} background='black' />
      <div className='cart-container'>
        <h1>Your Cart</h1>
          <div className='cart-box'>
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                />
              ))}
            </div>
            <div>
              <p>Payment</p>
              {/* <PaymentComponent subtotal={subtotal} discount={discount} total={total} /> */}
              <hr />
              <button onClick={handleCheckout}>Checkout - ${total.toFixed(2)} CAD</button>
            </div>
          </div>
      </div>
    </div>
  );
}


