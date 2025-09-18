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

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

    useEffect(()=>{
    apiCall()
  },[])

const apiCall=async()=>{
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
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <img
          src="https://res.cloudinary.com/dvbmbe4cl/image/upload//v1758033002/Screenshot_2025-09-16_190258_pcq6ln.png"
          alt="BookHub Logo"
          className="h-12"
        />
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
              {couroselSlider()}
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
