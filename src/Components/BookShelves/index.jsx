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
  const [load, setLoad] = useState(true)
    const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  const JWT_TOKEN=Cookies.get("jwt_token")
const fetchBooks = async () => {
  setLoad(false)
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
  const loading=()=>{
    return(
    <div className="w-full h-full flex pt-[150px]  justify-center">
    
<div role="status ">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

    </div>
  )
  }
const bookDeatil=()=>{
  return(
    
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
  )
}
  useEffect(() => {
    fetchBooks();
  }, [shelf, searchText]);
    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white  shadow">
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
            <div>
              {load ? loading():bookDeatil()}
            </div>
          {/* <div className="grid grid-cols-2 gap-6">
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
          </div> */}
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

