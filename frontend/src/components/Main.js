import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import BookPage from '../pages/BookPage'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'

export default function Main () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "profile-picture.jpeg"
  })
  const [booksData, setBooksData] = useState([])
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [cartCount, setCartCount] = useState(0)

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
  }, []);

  return (
    <Routes>
        <Route index element={<Home 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          profile={profile} 
          borrowedBooks={borrowedBooks} 
          booksData={booksData} 
          setCartCount={setCartCount} 
          cartCount={cartCount}
          setBorrowedBooks={setBorrowedBooks}
          />}>
        </Route>
        <Route exact path='/BookPage' element={<BookPage />}></Route>
        <Route exact path='/LoginPage' element={<LoginPage setLoggedIn={setLoggedIn} setProfile={setProfile} />}></Route>
        <Route exact path='/CartPage' element={<CartPage />}></Route>
    </Routes>
  );
}

// TO FIX IMAGES NOT LOADING ON MYWEB JUST MAKE 
// https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/build/
// THE HOMEPAGE URL AND FIX ALL THESE ROUTES