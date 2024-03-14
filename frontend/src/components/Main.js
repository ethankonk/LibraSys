import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import BookPage from '../pages/BookPage'
import LoginPage from '../pages/LoginPage'

export default function Main ({ booksData }) {
  return (
    <Routes>
      <Route exact path='/' element={<Home booksData={booksData} />}></Route>
      <Route exact path='/BookPage' element={<BookPage />}></Route>
      <Route exact path='/LoginPage' element={<LoginPage />}></Route>
    </Routes>
  );
}

// TO FIX IMAGES NOT LOADING ON MYWEB JUST MAKE 
// https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/build/
// THE HOMEPAGE URL AND FIX ALL THESE ROUTES