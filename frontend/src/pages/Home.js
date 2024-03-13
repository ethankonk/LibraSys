import { useState, useEffect } from 'react'

import StarsCanvas from '../components/StarsCanvas';
import Hero from '../components/Hero';
import ProfilePreview from '../components/ProfilePreview';
import CartPreview from '../components/CartPreview';
import Navbar from '../components/Navbar';
import Books from '../components/Books';

export default function Home ({ booksData }) {

    const [borrowedBooks, setBorrowedBooks] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [profileIsOpen, setProfileIsOpen] = useState(false)
  
    const addToCart = (id) => {
      setBorrowedBooks(prevBorrowedBooks => {
        return [...prevBorrowedBooks, id]
      })
      setCartCount(cartCount+1)
    }
  
    const clearCart = () => {
      setBorrowedBooks([])
      setCartCount(0)
    }
  
    const toggleCart = () => {
      setCartIsOpen(!cartIsOpen)
    }
   
    const toggleProfile = () => {
      setProfileIsOpen(!profileIsOpen)
    }

    const testUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        profilePicture: "profile-picture.jpeg"
    };

    return (
        <div>
            <CartPreview onClose={toggleCart} isOpen={cartIsOpen} cartItems={booksData} />
            <Navbar background={'transparent'} cart={cartCount} inCart={borrowedBooks} toggleProfile={toggleProfile} isLoggedIn={false} toggleCart={toggleCart} />
            {profileIsOpen && <ProfilePreview user={testUser} toggleProfile={toggleProfile} isOpen={true} />}
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