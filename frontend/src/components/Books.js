import React from 'react';
import '../index.css';

export default function Books ( { id, title, author, price, imageUrl, addToCart } ) {
    const handleBorrow = () => {
        addToCart(id)

        console.log(`Borrowing ${id}`);
        console.log(imageUrl)
      };
    
      return (
        <div className="book-card">
          <img src={require(`../images/covers/${imageUrl}`)} alt="Book Cover" />
          <div className="book-details">
            <h2 className="book-title">{title}</h2>
            <p className="author">{author}</p>
            <p className="price">${price}</p>
            <button className="button secondary" onClick={handleBorrow}>Add to Cart WEE</button>
          </div>
        </div>
      );
}