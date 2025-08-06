import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaHeart, FaBars, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]);

  const updateUser = () => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('user_id');
    if (storedUsername && storedUserId) {
      setUser({ username: storedUsername });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost/bookstore/api/books/search.php?query=${encodeURIComponent(query)}`);
      if (response.data && Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error fetching search results:', err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500); 
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <nav className="container bg-white text-black shadow-lg h-20 sticky top-0 z-50">
      <div className="mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-black transition-colors">
          <Link to="/">PAP<span className="text-purple-800">YROS</span></Link>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <FaSearch className="ml-2 text-gray-500" />
              <input
                type="text"
                placeholder="جستجوی کتاب"
                className="w-full text-right py-2 px-4 rounded-lg bg-transparent text-black focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-12 right-0 w-full bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    to={`/book/${book.id}`}
                    className="block p-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setSearchQuery('')} 
                  >
                    <span className="text-black">{book.title}</span>
                  </Link>
                ))}
              </div> 
            )}
          </div>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          {user ? (
            <span className="flex items-center space-x-2 text-black font-medium">
              <FaUser />
              <span>{user.username}</span>
            </span>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 text-black hover:text-purple-600 font-medium transition-colors"
            >
              <FaUser />
              {/* <span>ورود/ثبت‌نام</span> */}
            </Link>
          )}
          <Link
            to="/favorites"
            className="flex items-center space-x-2 text-black hover:text-purple-600 font-medium transition-colors"
          >
            <FaHeart />
            {/* <span>علاقه‌مندی‌ها</span> */}
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded"
            aria-label="Toggle menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 shadow-sm">
          <div className="px-6 py-4 space-y-4">
            {user ? (
              <span className="flex items-center space-x-3 text-black font-medium">
                <FaUser />
                <span>{user.username}</span>
              </span>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-3 text-black hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaUser />
                <span>ورود/ثبت‌نام</span>
              </Link>
            )}
            <Link
              to="/favorites"
              className="flex items-center space-x-3 text-black hover:text-purple-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FaHeart />
              <span>علاقه‌مندی‌ها</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;









// import { useState, useEffect } from 'react';  
// import { Link, useNavigate } from 'react-router-dom';  
// import { FaUser, FaHeart, FaBars, FaSearch, FaSignOutAlt } from 'react-icons/fa';  

// const Navbar = () => {  
//   const [isOpen, setIsOpen] = useState(false);  
//   const [user, setUser] = useState(null);  
//   const navigate = useNavigate();  

//   const updateUser = () => {  
//     const storedUsername = localStorage.getItem('username');  
//     const storedUserId = localStorage.getItem('user_id');  
//     if (storedUsername && storedUserId) {  
//       setUser({ username: storedUsername });  
//     } else {  
//       setUser(null);  
//     }  
//   };  

//   useEffect(() => {  
//     updateUser();  
//     window.addEventListener('storage', updateUser);  
//     return () => window.removeEventListener('storage', updateUser);  
//   }, []);  

//   const handleLogout = () => {  
//     localStorage.removeItem('user_id');  
//     localStorage.removeItem('username');  
//     setUser(null);  
//     window.dispatchEvent(new Event('storage'));  
//     navigate('/login');  
//   };  

//   return (  
//     <nav className="container bg-white text-black shadow-lg h-20 sticky top-0 z-50">  
//       <div className="mx-auto px-6 py-3 flex justify-between items-center">  
//         <div className="text-2xl font-extrabold text-black transition-colors">  
//           <Link to="/">PAP<span className="text-purple-800">YROS</span></Link>  
//         </div>  

//         <div className="flex-1 mx-4">  
//           <div className="relative">  
//             <div className="flex items-center bg-gray-100 rounded-lg">  
//               <FaSearch className="ml-2 text-gray-500" />  
//               <input  
//                 type="text"  
//                 placeholder="....جستجو"  
//                 className="w-full text-right py-2 px-4 rounded-lg bg-transparent text-black focus:outline-none"  
//               />  
//             </div>  
//           </div>  
//         </div>  

//         <div className="hidden md:flex space-x-6 items-center">  
//           {user ? (  
//             <>  
//               <span className="flex items-center space-x-2 text-black font-medium">  
//                 <FaUser />  
//                 <span>{user.username}</span>  
//               </span>  
//               <button  
//                 onClick={handleLogout}  
//                 className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-medium transition-colors focus:outline-none"  
//                 aria-label="Logout"  
//               >  
//                 <FaSignOutAlt />  
//                 <span>خروج</span>  
//               </button>  
//             </>  
//           ) : (  
//             <Link  
//               to="/login"  
//               className="flex items-center space-x-2 text-black hover:text-purple-600 font-medium transition-colors"  
//             >  
//               <FaUser />  
//               <span>ورود/ثبت‌نام</span>  
//             </Link>  
//           )}  
//           <Link  
//             to="/favorites"  
//             className="flex items-center space-x-2 text-black hover:text-purple-600 font-medium transition-colors"  
//           >  
//             <FaHeart />  
//             <span>علاقه‌مندی‌ها</span>  
//           </Link>  
//         </div>  

//         <div className="md:hidden">  
//           <button  
//             onClick={() => setIsOpen(!isOpen)}  
//             className="text-black hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded"  
//             aria-label="Toggle menu"  
//           >  
//             <FaBars className="w-6 h-6" />  
//           </button>  
//         </div>  
//       </div>  

//       {isOpen && (  
//         <div className="md:hidden bg-white border-t border-gray-300 shadow-sm">  
//           <div className="px-6 py-4 space-y-4">  
//             {user ? (  
//               <>  
//                 <span className="flex items-center space-x-3 text-black font-medium">  
//                   <FaUser />  
//                   <span>{user.username}</span>  
//                 </span>  
//                 <button  
//                   onClick={() => {  
//                     handleLogout();  
//                     setIsOpen(false);  
//                   }}  
//                   className="flex items-center space-x-3 text-red-600 hover:text-red-800 font-medium transition-colors focus:outline-none"  
//                 >  
//                   <FaSignOutAlt />  
//                   <span>خروج</span>  
//                 </button>  
//               </>  
//             ) : (  
//                            <Link
//                 to="/login"
//                 className="flex items-center space-x-3 text-black hover:text-purple-600 font-medium transition-colors"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <FaUser />
//                 <span>ورود/ثبت‌نام</span>
//               </Link>
//             )}
//             <Link
//               to="/favorites"
//               className="flex items-center space-x-3 text-black hover:text-purple-600 font-medium transition-colors"
//               onClick={() => setIsOpen(false)}
//             >
//               <FaHeart />
//               <span>علاقه‌مندی‌ها</span>
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;