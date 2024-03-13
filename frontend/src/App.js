import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartPreview from './components/CartPreview';
import Main from './components/Main'
import ProfilePreview from './components/ProfilePreview';

function App() {
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartIsOpen, setCartIsOpen] = useState(false)
  const [booksData, setBooksData] = useState([])
  const [profileIsOpen, setProfileIsOpen] = useState(false)
  const [atHome, setAtHome] = useState(true)

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
    setProfileIsOpen(!profileIsOpen)
  }

  const testUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "profile-picture.jpeg"
  };

  

  return (
    <div className="App">
      <CartPreview onClose={toggleCart} isOpen={cartIsOpen} cartItems={booksData} />
      <Navbar atHome={atHome} cart={cartCount} inCart={borrowedBooks} toggleProfile={toggleProfile} isLoggedIn={false} toggleCart={toggleCart} />
      {profileIsOpen && <ProfilePreview user={testUser} toggleProfile={toggleProfile} isOpen={true} />}
      <Main booksData={booksData} cartCount={cartCount} addToCart={addToCart} />
      <Footer />
    </div>
  );
}

export default App;
