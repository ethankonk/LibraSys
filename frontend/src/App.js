import './App.css';
import { useState, useEffect } from 'react';

import Footer from './components/Footer';
import Main from './components/Main'


function App() {
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

  return (
    <div className="App">
      <Main booksData={booksData} />
      <Footer />
    </div>
  );
}

export default App;
