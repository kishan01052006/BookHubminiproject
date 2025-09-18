 import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
const shelves = [
  { id: "ALL", label: "All" },
  { id: "READ", label: "Read" },
  { id: "CURRENTLY_READING", label: "Currently Reading" },
  { id: "WANT_TO_READ", label: "Want to Read" },
];
 const Bookshelves=()=>{
    const [books, setBooks] = useState([]);
  const [shelf, setShelf] = useState("ALL");
  const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  const JWT_TOKEN=Cookies.get("jwt_token")
const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setBooks(data.books);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [shelf, searchText]);
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
      <div className="flex flex-1">
        <div className="w-64 bg-white shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Bookshelves</h2>
          <ul className="space-y-2">
            {shelves.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setShelf(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    shelf === item.id
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">All Books</h1>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border px-3 py-2 rounded-lg w-64"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {books.map((book) => (
                <Link to={`/BookDetails/${book.id}`} key={book.id}><div
                  
                  className="flex items-start space-x-4 bg-white p-4 rounded shadow"
                >
                  <img
                    src={book.cover_pic}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="flex flex-col justify-around h-[100%]">
                    <h3 className="text-lg font-medium">{book.title}</h3>
                    <p className="text-gray-600">{book.author_name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                     Rating ⭐ {book.rating}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span className="text-blue-600 font-medium">
                        {book.read_status}
                      </span>
                    </p>
                  </div>
                </div>
                </Link> 
              ))
             }
          </div>
        </div>
      </div>

      
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
 
 export default Bookshelves

