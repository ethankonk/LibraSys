import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import '../css/cart-item.css';

export default function CartItem ({ item, removeFromCart  }) {
  const { title, imageUrl, price, author, id } = item;

  return (
    <div className="cart-item">
      <img src={`/COMP-3077-W24/assignments/finalproject/build/static/media/${imageUrl}`} alt="Item" className="item-image" />

        <div className='item-box'>

          <div className="item-details-cart">
            <h3 className="item-title">{title}</h3>
            <p>{author}</p>
          </div>

          <div className='item-details-cart2'>
            <p className="item-price">${price.toFixed(2)}</p>
            <button onClick={()=>removeFromCart(item.id)} className="button secondary trash cart-delete">
              <FaRegTrashAlt />
            </button>
          </div>
          
        </div>
    </div>
  );
};
