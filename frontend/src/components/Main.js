import { useState } from 'react'
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

  return (
    <Routes>
        <Route index element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} profile={profile} />}></Route>
        <Route exact path='/BookPage' element={<BookPage />}></Route>
        <Route exact path='/LoginPage' element={<LoginPage setLoggedIn={setLoggedIn} setProfile={setProfile} />}></Route>
        <Route exact path='/CartPage' element={<CartPage />}></Route>
    </Routes>
  );
}

// TO FIX IMAGES NOT LOADING ON MYWEB JUST MAKE 
// https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/build/
// THE HOMEPAGE URL AND FIX ALL THESE ROUTES