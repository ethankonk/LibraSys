import React from 'react'
import '../index.css'
import '../css/books.css'

export default function Books ( { id, title, author, price, imageUrl, addToCart, admin, deleteBook } ) {
    const handleBorrow = () => {
        addToCart(id)

        console.log(`Borrowing ${id}`);
        console.log(imageUrl)
    };

    if(admin) {
      return (
        <div className="book-card">
          <img src={require(`../images/covers/${imageUrl}`)} alt="Book Cover" />
          <div className="book-details">
            <h2 className="book-title">{title}</h2>
            <p className="author">{author}</p>
            <p className="price">${price.toFixed(2)}</p>
            <button className="button secondary" onClick={()=>deleteBook(title)}>Delete Book</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="book-card">
          <img src={require(`../images/covers/${imageUrl}`)} alt="Book Cover" />
          <div className="book-details">
            <h2 className="book-title">{title}</h2>
            <p className="author">{author}</p>
            <p className="price">${price.toFixed(2)}</p>
            <button className="button secondary" onClick={handleBorrow}>Add to Cart</button>
          </div>
        </div>
      );
    }
}