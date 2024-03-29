import React from 'react'
import '../index.css'
import '../css/books.css'

export default function Books ( { id, title, author, price, imageUrl, addToCart, admin, deleteBook } ) {
    

    if(admin) {
      return (
        <div className="book-card">
          <img src={`/COMP-3077-W24/assignments/finalproject/build/static/media/${imageUrl}`} alt="Book Cover" />
          <div className="book-details">
            <h2 className="book-title">{title}</h2>
            <p className="author">{author}</p>
            <p className="price">${price.toFixed(2)}</p>
            <button className="button secondary" onClick={()=>deleteBook(id)}>Delete Book</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="book-card">
          <img src={`/COMP-3077-W24/assignments/finalproject/build/static/media/${imageUrl}`} alt="Book Cover" />
          <div className="book-details">
            <h2 className="book-title">{title}</h2>
            <p className="author">{author}</p>
            <p className="price">${price.toFixed(2)}</p>
            <button className="button secondary" onClick={()=>addToCart(id)}>Add to Cart</button>
          </div>
        </div>
      );
    }
}