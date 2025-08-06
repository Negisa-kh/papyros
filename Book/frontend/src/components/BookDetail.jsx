import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [isFavorite, setIsFavorite] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost/bookstore/pages/details.php?id=${id}`);
        if (response.data) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(response.data, 'text/html');
          const title = doc.querySelector('h1')?.textContent || 'بدون عنوان';
          const author = doc.querySelector('p strong')?.nextSibling?.textContent.trim() || 'ناشناس';
          const description = doc.querySelector('p:nth-child(3)')?.textContent || 'توضیحاتی موجود نیست';
          const coverImage = doc.querySelector('img')?.getAttribute('src') || '/images/default-book.jpg';

          setBook({ id, title, author, description, cover_image: coverImage });

          // Sample recommended books (replace with actual API call if available)
          const sampleBooks = [
            { id: '1', title: ' کتاب آرزوهای بزرگ ', author: ' چارلز دیکنز', cover_image: '/images/book12.jpg' },
            { id: '2', title: 'کتاب اشتباه در ستاره‌های بخت ما ', author: ' جان گرین', cover_image: '/images/book13.jpg' },
            { id: '3', title: 'کتاب بلندی‌های بادگیر', author: ' امیلی‌جین برونته', cover_image: '/images/book14.jpg' },
            { id: '4', title: ' کتاب پسرک، موش کور، روباه و اسب', author: ' چارلی مکسی', cover_image: '/images/book15.jpg' },
            { id: '5', title: ' کتاب پنج قدم فاصله', author: 'ریچل لیپینکات ', cover_image: '/images/book16.jpg' },
          ];
          setRecommendedBooks(sampleBooks);
        } else {
          setError('داده‌ای از سرور دریافت نشد');
        }
      } catch (err) {
        setError(`Failed to fetch book: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // const handleToggleFavorite = () => {
  //   setIsFavorite((prev) => !prev);
  // };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center">کتابی یافت نشد!</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 text-right">
      <button
        onClick={() => navigate('/')}
        className="mb-4 bg-purple-200 text-black py-1 px-2 rounded-md hover:bg-purple-400 transition-colors flex items-center space-x-2"
      >
        <FaArrowLeft className="w-4 h-4" />
        <FaHome className="w-5 h-5" />
      </button>
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-4">{book.title}</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="relative w-full md:w-1/3">
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg shadow-md"
          />
          {/* <button
            onClick={handleToggleFavorite}
            className="absolute sm:top-0.5 sm:left-96 bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center"
            aria-label="Toggle Favorite"
          >
            <svg
              className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : 'fill-white'}`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button> */}
        </div>
        <div className="w-full md:w-2/3">
          <p className="text-gray-600 text-lg sm:text-xl mb-2"><strong>نویسنده:</strong> {book.author}</p>
          <p className="text-gray-700 text-base sm:text-lg">{book.description}</p>
        </div>
      </div>
      <div className="mt-24">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">کتاب‌های پیشنهادی</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {recommendedBooks.map((recBook) => (
            <div key={recBook.id} className="border rounded-lg p-2 shadow-md">
              <img
                src={recBook.cover_image}
                alt={recBook.title}
                className="w-full h-32 object-contain rounded-md"
              />
              <h3 className="text-md font-medium mt-2">{recBook.title}</h3>
              <p className="text-sm text-gray-600">نویسنده: {recBook.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;