import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './CartItem.css';

export default function CartItem ({ item, onDelete }) {
  const { title, imageUrl, price } = item;

  return (
    <div className="cart-item">
      <img src={imageUrl} alt="Item" className="item-image" />
      <div className="item-details">
        <p className="item-title">{title}</p>
      </div>
      <p className="item-price">${price.toFixed(2)}</p>
      <button onClick={()=>onDelete(item)} className="delete-button">
        <FaTrash />
      </button>
    </div>
  );
};
