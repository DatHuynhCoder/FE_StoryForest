import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../services/api";
// icon
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill, RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  //user info
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await api.post("/api/reader/account/register", { username, email, password });
      if (response.data.success) {
        alert("Sign up successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error during signup", error);
      alert("An error occured, please try again");
    }
  }

  return (
    <div className="w-full h-screen bg-cover sm:bg-[url(/images/bg_signup_lap.jpg)] bg-[url(/images/bg_signup_phone.jpg)] bg-center flex justify-center items-center">
      <div className="bg-white/50 rounded-3xl px-5 py-4 xl:w-3/10 lg:w-2/5 sm:w-1/2 w-3/4 min-h-1/2 flex flex-col gap-4">
        {/* header-login */}
        <h1 className="font-bold text-(--secondary-text-color) text-3xl">
          Let Create <span className="sm:block">an Account</span>
        </h1>
        <p className="font-bold text-(--secondary-text-color) text-sm">
          Please enter your information here
        </p>

        {/* username box */}
        <div className="mt-5 bg-(--primary-color) flex items-center rounded-3xl gap-2.5 px-5 py-2">
          <FaUserCircle className="w-8 h-8 text-blue-800" />
          <input
            className="flex-1 w-full pl-2 py-1 focus:outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* email box */}

        <div className="bg-(--primary-color) flex items-center rounded-3xl gap-2.5 px-5 py-2">
          <MdEmail className="w-8 h-8 text-blue-800" />
          <input
            className="flex-1 w-full pl-2 py-1 focus:outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password box */}
        <div className="bg-(--primary-color) flex items-center rounded-3xl gap-2.5 px-5 py-2 relative">
          <RiLockPasswordFill className="w-8 h-8 text-blue-800" />
          <input
            className="flex-1 w-full pl-2 py-1 focus:outline-none"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* See password button */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-blue-500"
          >
            {showPassword ? (
              <RiEyeCloseFill className="w-6 h-6" />
            ) : (
              <RiEyeFill className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Login button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="w-full sm:w-1/2 text-(--secondary-text-color) font-bold cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={handleSignup}
          >
            Đăng ký
          </button>
        </div>

        {/* sign up option */}
        <div className="mt-5">Already have an account?
          <span className="font-bold text-(--secondary-color) cursor-pointer text-2xl underline-offset-6 underline">
            <Link to="/login">Log in</Link></span></div>
      </div>
    </div>
  )
}

export default Signup