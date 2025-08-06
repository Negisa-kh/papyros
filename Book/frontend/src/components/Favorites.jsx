import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = '1';

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost/bookstore/api/favorites/list.php?user_id=${userId}`);
        if (response.data && Array.isArray(response.data)) {
          setFavorites(response.data);
        } else {
          setError('داده‌ای از سرور دریافت نشد');
        }
      } catch (err) {
        setError(`خطا در دریافت علاقه‌مندی‌ها: ${err.message}`);
        console.error('Error details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (bookId) => {
    try {
      const response = await axios.delete('http://localhost/bookstore/api/favorites/delete.php', {
        data: { user_id: userId, book_id: bookId },
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.message) {
        setFavorites((prev) => prev.filter((fav) => fav.book_id !== bookId)); 
      }
    } catch (err) {
      setError(`خطا در حذف از علاقه‌مندی‌ها: ${err.message}`);
      console.error('Error details:', err);
    }
  };

  const handleDetails = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (loading) return <p className="text-center bg-gray-200 flex items-center justify-center min-h-screen font-bold text-2xl">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500 flex items-center justify-center min-h-screen">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 text-right">
      <button
        onClick={() => navigate('/')}
        className="mb-4 bg-purple-200 text-black py-1 px-2 rounded-md hover:bg-purple-400 transition-colors flex items-center space-x-2"
      >
        <FaArrowLeft className="w-4 h-4" />
        <FaHome className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-bold text-purple-600 mb-6">کتاب‌های مورد علاقه</h2>
      {favorites.length === 0 ? (
        <p className="text-center bg-gray-200 flex items-center justify-center min-h-screen font-bold text-2xl">هیچ کتابی در علاقه‌مندی‌ها وجود ندارد</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((favorite) => (
            <div key={favorite.book_id} className="border rounded-lg p-4 shadow-md relative">
              <img
                src={favorite.cover_image || '/images/default-book.jpg'}
                alt={favorite.title}
                className="w-full h-48 object-contain rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{favorite.title || 'بدون عنوان'}</h3>
              <p className="text-sm text-gray-600">نویسنده: {favorite.author || 'ناشناس'}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleDetails(favorite.book_id)}
                  className="bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 transition-colors"
                >
                  جزئیات
                </button>
                <button
                  onClick={() => handleRemoveFromFavorites(favorite.book_id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
                  aria-label="حذف از علاقه‌مندی‌ها"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;