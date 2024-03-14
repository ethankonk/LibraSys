import React from 'react'
import CartItem from '../components/CartItem'
import PaymentComponent from '../components/Payment'

export default function CartPage ({ cartItems }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)
  const subtotal = totalPrice
  const discount = 0
  const total = subtotal - discount

  const handleCheckout = () => {
    console.log('Checkout clicked')
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        <div>
            {cartItems.map(item =>  (
                <CartItem item={item} />
                )
            )}
        </div>
        <div>
          <PaymentComponent subtotal={subtotal} discount={discount} total={total} />
          <hr />
          <button onClick={handleCheckout}>Checkout - ${total.toFixed(2)} CAD</button>
        </div>
      </div>
    </div>
  );
}

