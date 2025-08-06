import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('username');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">داشبورد کاربری</h1>
      <p className="mb-4">خوش آمدید، {user || 'کاربر'}!</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        خروج
      </button>
    </div>
  );
};

export default Dashboard;