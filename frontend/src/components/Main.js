import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import BookPage from '../pages/BookPage'

export default function Main ({ booksData, cartCount, addToCart }) {
  return (
    <Routes>
      <Route exact path='/' element={<Home booksData={booksData} cartCount={cartCount} addToCart={addToCart} />}></Route>
      <Route exact path='/BookPage' element={<BookPage />}></Route>
    </Routes>
  );
}