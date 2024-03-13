import './App.css';
import { useState, useEffect } from 'react';
import Books from './components/Books';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import StarsCanvas from './components/StarsCanvas';
import CartPreview from './components/CartPreview';
import ProfilePreview from './components/ProfilePreview';

function App() {
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartIsOpen, setCartIsOpen] = useState(false)
  const [booksData, setBooksData] = useState([])

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
    console.log("Profile clicked")
  }

  const testUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "profile-picture.jpeg"
  };

  return (
    <div className="App">
      <CartPreview onClose={toggleCart} isOpen={cartIsOpen} cartItems={booksData} />
      <Navbar cart={cartCount} inCart={borrowedBooks} clearCart={clearCart} toggleCart={toggleCart} />
      <ProfilePreview user={testUser} isLoggedIn={true} onClose={toggleProfile} isOpen={true} />
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
      <Footer />
    </div>
  );
}

export default App;



// DB Name:  konkoloe_LibrarySystem
// DB User:  konkoloe_LibrarySystem
// Password: F7pL5RwuzP9pcxN33Zwx