import { useState } from 'react'

import Navbar from '../components/Navbar'
import Books from '../components/Books'
import BorrowGraph from '../components/BorrowGraph'
import '../css/admin-page.css'
import '../index.css'

export default function AdminPage({ setBookAdded,setBookRemoved, booksData, cartCount, addToCart }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        isbn: '',
        coverImage: null,
    });
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, coverImage: file });
    };

    const handleBookAdded = () => {
        setBookAdded(prevBookAdded => (prevBookAdded+1));
        setSuccess(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('isbn', formData.isbn);
        formDataToSend.append('coverImage', formData.coverImage);

        try {
            const response = await fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/addBook.php', {
                method: 'POST',
                body: formDataToSend,
            });
            const data = await response.json();
            if (data.success) {
                console.log('Book uploaded successfully');
                handleBookAdded();
            } else {
                console.error('Error uploading book:', data.error);
            }
        } catch (error) {
            console.error('Error uploading book:', error);
        }
    };

    function deleteBook(id) {
        console.log(id);
        fetch('https://konkoloe.myweb.cs.uwindsor.ca/COMP-3077-W24/assignments/finalproject/backend/deleteBook.php', {
            method: 'POST',
            body: JSON.stringify({ ISBN: id }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Book deleted successfully');
                setBookRemoved(prevBookRemoved => (prevBookRemoved+1))
            } else {
                console.error('Failed to delete book');
            }
        })
        .catch(error => {
            console.error('Error deleting book:', error);
        });
    }

    return (
        <div>
            <Navbar background='black' buttons={false} />
            <div className='admin-container'>
                <div className="admin-box">
                    <h1>Add New Book</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        <label>Author:</label>
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                        <label>Price:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                        <label>ISBN:</label>
                        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
                        <label>Cover Image:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                        <button className='button primary' type="submit">Submit</button>
                    </form>
                </div>
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
                      deleteBook = {deleteBook}
                      admin={true}
                  />
                  ))}
              </div>
        </div>
    );
}
