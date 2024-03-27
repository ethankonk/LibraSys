import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import StarsCanvas from '../components/StarsCanvas';
import Hero from '../components/Hero';
import ProfilePreview from '../components/ProfilePreview';
import CartPreview from '../components/CartPreview';
import Navbar from '../components/Navbar';
import Books from '../components/Books';
import ScrollToTop from '../components/ScrollToTop';
import '../index.css'
import '../css/books.css'

export default function Home ({ setLoggedIn, loggedIn, profile, borrowedBooks, booksData, removeFromCart, addToCart, cartCount }) {

    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [profileIsOpen, setProfileIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleEditButtonClick = () => {
        navigate('/Admin')
    }
  
    const toggleCart = () => {
      setCartIsOpen(!cartIsOpen)
    }
   
    const toggleProfile = () => {
      setProfileIsOpen(!profileIsOpen)
    }

    return (
        <div>
            <ScrollToTop />
            <CartPreview onClose={toggleCart} isOpen={cartIsOpen} cartItems={borrowedBooks} handleDelete={removeFromCart} />
            <Navbar 
                background={'transparent'} 
                cart={cartCount} 
                inCart={borrowedBooks}
                toggleProfile={toggleProfile} 
                isLoggedIn={loggedIn} 
                toggleCart={toggleCart}
                buttons={true}
            />
            {profileIsOpen && <ProfilePreview user={profile} toggleProfile={toggleProfile} setLoggedIn={setLoggedIn} />}
            <Hero />
            <StarsCanvas />
            <div className='book-section'>
              <div className='book-header'>
                <h1>Books</h1>
                {loggedIn && profile.permission == 'admin' && <button className='button secondary edit-button' onClick={handleEditButtonClick}>Edit Books</button>}
              </div>
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
                      admin={false}
                  />
                  ))}
              </div>
            </div>
        </div>
    );
}