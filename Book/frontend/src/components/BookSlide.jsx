import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import axios from 'axios';

const BookSlide = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const userId = '1';

  useEffect(() => {
    const fetchBooksAndFavorites = async () => {
      try {
        const booksResponse = await axios.get('http://localhost/bookstore/api/books/list.php');
        if (booksResponse.data && Array.isArray(booksResponse.data)) {
          setBooks(booksResponse.data.slice(0, 6));
        } else {
          setError('داده‌های نامعتبر از API کتاب‌ها');
        }

        const favoritesResponse = await axios.get(`http://localhost/bookstore/api/favorites/list.php?user_id=${userId}`);
        if (favoritesResponse.data && Array.isArray(favoritesResponse.data)) {
          const favoriteBookIds = favoritesResponse.data.map(fav => fav.book_id);
          setFavorites(favoriteBookIds);
        } else {
          setError('داده‌های نامعتبر از API علاقه‌مندی‌ها');
        }
      } catch (err) {
        setError(`خطا در دریافت داده‌ها: ${err.message}`);
        console.error('Error details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooksAndFavorites();
  }, []);

  const handleAddToFavorites = async (bookId) => {
    try {
      if (favorites.includes(bookId)) {
        const response = await axios.delete('http://localhost/bookstore/api/favorites/delete.php', {
          data: { user_id: userId, book_id: bookId },
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.data.message) {
          setFavorites(prev => prev.filter(id => id !== bookId));
        }
      } else {
        const response = await axios.post('http://localhost/bookstore/api/favorites/add.php', {
          user_id: userId,
          book_id: bookId
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.data.message) {
          setFavorites(prev => [...prev, bookId]);
        }
      }
    } catch (err) {
      setError(`خطا در به‌روزرسانی علاقه‌مندی‌ها: ${err.message}`);
      console.error('Error details:', err);
    }
  };

  const handleDetails = (id) => {
    navigate(`/book/${id}`);
  };

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="lg:mt-20 flash-sales-container mx-auto py-10 relative max-w-[95vw] text-right">
      <h2 className="container1 text-right text-purple-600 text-2xl font-bold mb-6">کتاب‌های ویژه</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        freeMode={true}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay, FreeMode, Pagination]}
        className="mySwiper mx-auto max-w-[100vw]"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id} className="flex items-center justify-center">
            <div className="bg-white product-card p-4 border rounded-lg shadow-md relative w-full mx-auto max-w-[90vw] sm:max-w-[22rem]">
              <div className="relative overflow-hidden rounded-t-lg h-56 flex items-center justify-center">
                <img
                  src={book.cover_image || '/images/default-book.jpg'}
                  alt={book.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="mt-2 text-lg font-semibold">{book.title || 'بدون عنوان'}</h3>
              <div className="mt-1">
                <p className="text-gray-600 text-xs">نویسنده: {book.author || 'ناشناس'}</p>
                {book.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{book.description}</p>
                )}
              </div>
              <div className="flex justify-center items-center mt-2 space-x-2">
                <button
                  onClick={() => handleAddToFavorites(book.id)}
                  className="bg-purple-600 p-1 rounded-md hover:bg-purple-400 transition-colors flex items-center justify-center"
                  aria-label={favorites.includes(book.id) ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                >
                  <svg
                    className={`w-5 h-5 ${favorites.includes(book.id) ? 'fill-red-500' : 'fill-white'}`}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleDetails(book.id)}
                  className="bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 transition-colors"
                >
                  جزئیات
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookSlide;