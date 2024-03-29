import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import StarsCanvas from '../components/StarsCanvas'
import Hero from '../components/Hero'
import ProfilePreview from '../components/ProfilePreview'
import CartPreview from '../components/CartPreview'
import Navbar from '../components/Navbar'
import Books from '../components/Books'
import ScrollToTop from '../components/ScrollToTop'
import SimpleAlert from '../components/SimpleAlert'
import '../index.css'
import '../css/books.css'

export default function Home ({ setLoggedIn, loggedIn, profile, borrowedBooks, booksData, removeFromCart, addToCart, cartCount, checkedOut, setCheckedOut }) {

    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [profileIsOpen, setProfileIsOpen] = useState(false)
    const [openCheckoutAlert, setOpenCheckoutAlert] = useState(false)
    const [openBorrowAlert, setOpenBorrowAlert] = useState(false)
    const navigate = useNavigate()

    const handleEditButtonClick = () => {
        navigate('/Admin')
    }
    
    const handleBorrow = (id) => {
      addToCart(id)
      setOpenBorrowAlert(true)
    }

    const toggleCart = () => {
      setCartIsOpen(!cartIsOpen)
    }
   
    const toggleProfile = () => {
      setProfileIsOpen(!profileIsOpen)
    }

    useEffect(()=>{
      if (checkedOut === true){
        setOpenCheckoutAlert(true)
      } else {
        setOpenCheckoutAlert(false)
      }
    }, [checkedOut])

    return (
        <div>
            <ScrollToTop />
            <SimpleAlert text='Successfully Purchased Items.' open={openCheckoutAlert} setOpen={setOpenCheckoutAlert} type='checkout' />
            <SimpleAlert text='Added to Cart!' open={openBorrowAlert} setOpen={setOpenBorrowAlert} type='borrow' />
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
                      addToCart={handleBorrow}
                      admin={false}
                  />
                  ))}
              </div>
            </div>
        </div>
    );
}