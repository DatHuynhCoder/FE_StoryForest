import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../services/api";
// icon
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

//use redux to store user
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  //user info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/reader/account/login", { email, password });
      if (response.data.success) {
        dispatch(loginSuccess({user: response.data.data, token: response.data.accessToken}))
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen bg-cover sm:bg-[url(/images/bg_login_lap.jpg)] bg-[url(/images/bg_login_phone.jpg)] bg-center flex justify-center items-center">
      <div className="bg-white/50 rounded-3xl px-5 py-3 xl:w-3/10 lg:w-2/5 sm:w-1/2 w-3/4 min-h-1/2 flex flex-col gap-3">
        {/* header-login */}
        <h1 className="font-bold text-(--secondary-text-color) text-3xl">
          Let Start <span className="sm:block">Reading</span>
        </h1>
        <p className="font-bold text-(--secondary-text-color) text-sm">
          Please login or sign up to continue
        </p>

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
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>

        <div className="flex justify-center">
          <button className="w-full sm:w-1/2 cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="w-full relative flex flex-row justify-center items-center gap-2 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </span>
          </button>
        </div>

        {/* sign up option */}
        <div className="mt-5">Doesn't have an account?
          <span className="font-bold text-(--secondary-color) cursor-pointer text-2xl underline-offset-6 underline">
            <Link to="/signup">Sign up</Link></span></div>
      </div>
    </div>
  );
};

export default Login;
