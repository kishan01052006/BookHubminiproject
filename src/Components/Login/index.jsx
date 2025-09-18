import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 }); 
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data.jwt_token); 
      } else {
        onSubmitFailure(data.error_msg);
      }
    } catch (err) {
      onSubmitFailure("Something went wrong. Please try again later.");
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen">
     
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src="https://res-console.cloudinary.com/dvbmbe4cl/thumbnails/v1/image/upload/v1758028679/MzA1NmM3YmJlN2VmYjBkM2Q3MWRjYjUwNjJmMWUwNzc1MjdkN2Y1ZF91djd5YmE=/drilldown"
          alt="login"
          className="loginimage w-full h-full"
        />
      </div>

      
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <img
              src="https://res.cloudinary.com/dvbmbe4cl/image/upload/v1758033002/Screenshot_2025-09-16_190258_pcq6ln.png"
              alt="logo"
              className="logo w-[150px] h-[70px] mt-[20px] ml-[20px]"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
          
            <div>
              <label className="block text-gray-600 font-medium">
                Username<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            
            <div>
              <label className="block text-gray-600 font-medium">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            
            {showSubmitError && (
              <p className="text-red-500 text-sm mt-2">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
