import React from 'react';
import { FaTrash } from 'react-icons/fa';
import '../css/cart-item.css';

export default function CartItem ({ item, onDelete }) {
  const { title, imageUrl, price } = item;

  return (
    <div className="cart-item">
      <img src={require(`../images/covers/${imageUrl}`)} alt="Item" className="item-image" />

        <div className='item-box'>

          <div className="item-details">
            <p className="item-title">{title}</p>
          </div>

          <div className='item-details2'>
            <p className="item-price">${price.toFixed(2)}</p>
            <button onClick={()=>onDelete(item)} className="delete-button">
              <FaTrash />
            </button>
          </div>
          
        </div>
    </div>
  );
};
