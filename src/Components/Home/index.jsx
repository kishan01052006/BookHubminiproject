import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./index.css"
const JWT_TOKEN=Cookies.get("jwt_token")
const Home = () => {
  const navigate = useNavigate();
  const [currentData,setdata]=useState(null)
  const [load, setLoad] = useState(true)

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

    useEffect(()=>{
    apiCall()
  },[])

const apiCall=async()=>{
  setLoad(false)
  const response=await fetch("https://apis.ccbp.in/book-hub/top-rated-books", {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
  const data=await response.json()
  setdata(data)
  console.log(data)

}
const couroselSlider=()=>{
  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <>
    <Slider {...settings}>
    {currentData?.books?.map((each)=>{
      return(
    <div className="slider-container">
      <Link to={`/BookDetails/${each.id}`}>
      <div>
        <img src={each.cover_pic} className="h-[180px] w-[200px]"/>
        <h1 className="text-center mt-5 font-bold">{each.title}</h1>
        <h2 className="text-center text-[11px]">{each.author_name}</h2>
        
      </div>
      </Link>
    </div>
      )
    })}
    </Slider>
    </>
  )
}

const loaderView=()=>{
  return(
    <div className="w-full h-full flex pt-[80px]  justify-center">
    
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
  return (
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
            href="/Bookshelves"
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
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto ">
          <h1 className="text-2xl font-bold text-gray-900">
            Find Your Next Favorite Books?
          </h1>
          <p className="mt-3 text-gray-600">
           You are in the right place. Tell us what titles or genres you have enjoyed in the past, and we will give you surprisingly insightful recommendations.
          </p>
          <div className="courosel flex flex-col h-[400px] w-[900px] bg-white p-[30px] ">
          <h1 className="text-[20px] font-bold">Top Rated Books</h1>

            <div className="slide ">
              {load ? loaderView() : couroselSlider()}
              </div>
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
  );
};

export default Home;
