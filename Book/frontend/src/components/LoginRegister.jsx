import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlassCircles from "./GlassCircles";

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("user_id");
    if (storedUsername && storedUserId) {
      setUser({ username: storedUsername, user_id: storedUserId });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const url = isLogin
      ? "http://localhost/bookstore/includes/login.php"
      : "http://localhost/bookstore/api/auth/register.php";

    const data = isLogin
      ? { username, password }
      : { username, email, password };

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      const responseData = response.data;
      setMessage(responseData.message || responseData.error);
      if (responseData.user_id) {
        const newUser = { username, user_id: responseData.user_id };
        setUser(newUser);
        localStorage.setItem("user_id", responseData.user_id);
        localStorage.setItem("username", username);
        setMessage(isLogin ? "ورود موفق!" : "ثبت‌نام موفق!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "خطایی رخ داد");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost/bookstore/includes/logout.php");
      setUser(null);
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      setMessage("خروج موفق!");
      window.dispatchEvent(new Event("storage"));
      navigate("/login");
    } catch (error) {
      setMessage("خروج ناموفق");
    }
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center p-4"
    >
      <div className="relative">
        <GlassCircles />
      </div>
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 text-center tracking-wide">
          {isLogin ? "ورود به حساب" : "ثبت‌نام"}
        </h2>
        {message && (
          <p
            className={`text-center py-2 px-4 rounded-md ${
              message.includes("موفق")
                ? "text-green-600 bg-green-100"
                : "text red-600 bg-red-100"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                ایمیل
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-all duration-200 font-semibold shadow-md"
          >
            {isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-purple-600 hover:text-purple-800 font-medium underline transition-colors duration-200 text-center"
        >
          {isLogin ? "ثبت‌نام کنید" : "ورود به حساب"}
        </button>
        {user && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all duration-200 font-semibold shadow-md"
          >
            خروج
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
