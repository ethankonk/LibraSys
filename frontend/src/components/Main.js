import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from '../pages/Home'
import BookPage from '../pages/BookPage'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import AdminPage from '../pages/AdminPage'
import ContactPage from '../pages/ContactPage'

export default function Main () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "profile-picture.jpeg",
    userID: 0,
    permission: ''
  })
  const [booksData, setBooksData] = useState([])
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [bookAdded, setBookAdded] = useState(0)
  const [bookRemoved, setBookRemoved] = useState(0)
  const [checkedOut, setCheckedOut] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch books data from PHP file
    fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/fetchBooks.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch books data');
        }
        console.log("Fetched Response");
        return response.json();
      })
      .then(data => {
        setBooksData(data);
      })
      .catch(error => {
        console.error("Error fetching books data:", error);
      });
  }, [bookAdded, bookRemoved]);

  const addToCart = (id) => {
    setBorrowedBooks(prevBorrowedBooks => {
      return [...prevBorrowedBooks, id]
    })
    setCartCount(cartCount+1)
  }

  const removeFromCart = (id) => {
    setBorrowedBooks(prevBorrowedBooks => {
      const newBorrowedBooks = []
      for(let i = 0; i < prevBorrowedBooks.length; i++){
        const currentBorrowedBook = prevBorrowedBooks[i]
        if (!(currentBorrowedBook === id)){
          newBorrowedBooks.push(currentBorrowedBook)
        }
      }
      return newBorrowedBooks
    })
    setCartCount(cartCount-1)
  }

  const handleCheckout = () => {
    console.log(profile)
    fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID: profile.userID,
            cartItems: borrowedBooks
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Books borrowed successfully');
            navigate('/')
            setCheckedOut(true)
            setBorrowedBooks([])
            setCartCount(0)
        } else {
            throw new Error('Failed to borrow books');
        }
    })
    .catch(error => {
        console.error('Error borrowing books:', error);
    });
  }

  return (
    <Routes>
        <Route index element={<Home 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          profile={profile} 
          borrowedBooks={borrowedBooks} 
          booksData={booksData} 
          cartCount={cartCount}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          checkedOut={checkedOut}
          setCheckedOut={setCheckedOut}
          />}>
        </Route>
        <Route exact path='/BookPage' element={<BookPage />}></Route>
        <Route exact path='/LoginPage' element={<LoginPage setLoggedIn={setLoggedIn} setProfile={setProfile} />}></Route>
        <Route exact path='/CartPage' element={<CartPage 
          borrowedBookIds={borrowedBooks} 
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          handleCheckout={handleCheckout}
          />}>
        </Route>
        <Route exact path='/Admin' element={<AdminPage 
          setBookAdded={setBookAdded}
          booksData={booksData} 
          cartCount={cartCount}
          addToCart={addToCart} 
          setBookRemoved={setBookRemoved}
        />}></Route>
        <Route exact path='/Contact' element={<ContactPage />}></Route>
    </Routes>
  );
}

// TO FIX IMAGES NOT LOADING ON MYWEB JUST MAKE 
// https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/build/
// THE HOMEPAGE URL AND FIX ALL THESE ROUTES