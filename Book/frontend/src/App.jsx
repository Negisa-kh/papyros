import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import Favorites from "./components/Favorites";
import Home from "./Home";
import BookDetail from "./components/BookDetail";
import Dashboard from "./components/Dashboard";
import Footer from "./footer/Footer";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/book/:id" element={<BookDetail />} /> 
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
       <Footer/>
      </div>
    </Router>
  );
}

export default App;