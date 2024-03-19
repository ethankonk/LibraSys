import { useState } from 'react';

import Navbar from '../components/Navbar';
import '../css/admin-page.css'
import '../index.css'

export default function AdminPage({ setBookAdded }) {
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
            console.log(data);
            handleBookAdded();
        } catch (error) {
            console.error('Error uploading book:', error);
        }
    };

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
        </div>
    );
}
