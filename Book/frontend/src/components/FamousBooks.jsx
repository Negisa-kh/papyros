import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FamousBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost/bookstore/api/books/list.php');
        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data.slice(6, 11)); 
        } else {
          setError('Invalid data from API');
        }
      } catch (err) {
        setError(`Failed to fetch books: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center text-gray-600">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 mt-14">کتاب‌های معروف</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ">
        {books.map((book) => (
          <div
            key={book.id}
            className="glassmorphism rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative overflow-hidden rounded-t-lg h-56 flex items-center justify-center">
              <img
                src={book.cover_image || '/images/default-book.jpg'} 
                alt={book.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title || 'بدون عنوان'}</h3>
              <Link
                to={`/book/${book.id}`} 
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                جزئیات کتاب
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FamousBooks;