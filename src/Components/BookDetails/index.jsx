import { useState, useEffect } from "react";
import {  Link } from "react-router";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const JWT_TOKEN=Cookies.get("jwt_token")

const BookDetails=()=>{
    const [book,setBook]=useState(null)
    const {bookId}=useParams()
    const fetchBook = async () => {
    try {
      const response = await fetch(
        ` https://apis.ccbp.in/book-hub/books/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setBook(data.book_details)
      } else {
        setBook(null)
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  if(!book){
    return ("Loading...")
  }
  return(
    <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <Link to="/">
        <img
          src="https://res.cloudinary.com/dvbmbe4cl/image/upload//v1758033002/Screenshot_2025-09-16_190258_pcq6ln.png"
          alt="BookHub Logo"
          className="h-12"
         />
         </Link>
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Home
          </a>
          <a
            href="/bookshelves"
            className="text-gray-600 font-medium hover:underline"
          >
            Bookshelves
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </nav>
      </header>

     <main className="py-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img
              alt={book.title}
              className="w-48 h-auto rounded-lg shadow-lg"
              src={book.cover_pic}
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
              <p className="text-xl text-gray-600 mt-2">{book.author_name}</p>
              <div className="flex items-center justify-center md:justify-start mt-4">
                <span className="text-lg text-gray-600 mr-2">Avg Rating</span>
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-xl font-bold text-gray-800 ml-1">
                  {book.rating}
                </span>
              </div>
              <p className="text-lg text-gray-600 mt-4">
                Status :{" "}
                <span className="text-blue-500 font-semibold">
                  {book.read_status}
                </span>
              </p>
            </div>
          </div>

          <hr className="my-8" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About Author
            </h2>
            <p className="text-gray-600 leading-relaxed">{book.about_author}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About Book
            </h2>
            <p className="text-gray-600 leading-relaxed">{book.about_book}</p>
          </div>
        </div>
      </main>
      
      <div className="bg-gray-50 py-6 mt-auto border-t">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex space-x-4 text-gray-600">
             <a
        href="https://www.google.com"
        target="_blank"
        className="hover:text-blue-600 transition"
      >
        
        <i className="fab fa-google"></i>
      </a>
            <a
        href="https://twitter.com"
        target="_blank"
        className="hover:text-blue-400 transition"
      >
        <i className="fab fa-twitter"></i>
      </a>
            <a
        href="https://instagram.com"
        target="_blank"
  
        className="hover:text-pink-500 transition"
      >
        <i className="fab fa-instagram"></i>
      </a>
           <a
        href="https://youtube.com"
        target="_blank"
        className="hover:text-red-600 "
      >
        <i className="fab fa-youtube"></i>
      </a>
          </div>
          <p className="text-gray-500 text-[15px]">Contact Us</p>
        </div>
      </div>
    </div>
  )
}
export default BookDetails