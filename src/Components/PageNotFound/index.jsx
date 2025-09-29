import { Link } from "react-router-dom"
const PageNotFound=()=>{
    return(
        <>
        <div className="flex flex-col items-center pt-[180px]">
            <img src="https://res.cloudinary.com/dvbmbe4cl/image/upload/v1758174415/Screenshot_2025-09-18_111544_c3pmpz.png" className="h-[250px] w-[250px]"/>
            <h1 className="font-bold mt-5">Page Not Found</h1>
            <p className="text-[15px] font-Roboto m-5">we are sorry, the page you requested could not be found,Please go back to the homepage.</p>
            <Link to="/">
            <p className="w-[150px] h-[40px] py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-center">
                Go to Home Page
            </p>
            </Link>
            
        </div>
        </>
    )
}
export default PageNotFound