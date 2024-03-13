import { useState, useEffect } from 'react'

import StarsCanvas from '../components/StarsCanvas';
import Hero from '../components/Hero';
import Books from '../components/Books';

export default function Home ({ booksData, cartCount, addToCart }) {

    return (
        <div>
            <Hero />
            <StarsCanvas />
            <div className= "book-container"> 
                {booksData.map(book => (
                <Books
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    imageUrl={book.imageUrl}
                    cart={cartCount}
                    addToCart={addToCart}
                />
                ))}
            </div>
        </div>
    );
}