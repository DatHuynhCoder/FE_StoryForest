import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password validation rules
  const passwordRules = [
    { id: 1, text: "At least 8 characters", test: pwd => pwd.length >= 8 },
    { id: 2, text: "At least one uppercase letter", test: pwd => /[A-Z]/.test(pwd) },
    { id: 3, text: "At least one lowercase letter", test: pwd => /[a-z]/.test(pwd) },
    { id: 4, text: "At least one number", test: pwd => /[0-9]/.test(pwd) },
    { id: 5, text: "At least one special character", test: pwd => /[^A-Za-z0-9]/.test(pwd) },
  ];

  useEffect(() => {
    if (location.state) {
      const { email, otp } = location.state;
      setEmail(email);
      setOtp(otp);
    }
  }, [location]);

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    const failedRules = passwordRules.filter(rule => !rule.test(newPassword));
    if (failedRules.length > 0) {
      setError("Password doesn't meet all requirements");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post('/api/user/accountAction/changepassbyOTP', {
        email: email,
        otp: otp,
        newpass: newPassword
      })
      if(response.data.success){
        setSuccess(true);
        navigate('/login');
      }
      else {
        toast.error("Cannot change password")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-cover sm:bg-[url(/images/bg_login_lap.jpg)] bg-[url(/images/bg_login_phone.jpg)] bg-center flex justify-center items-center">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl px-6 py-8 xl:w-3/10 lg:w-2/5 sm:w-1/2 w-11/12 flex flex-col gap-4 shadow-lg">
        <h1 className="font-bold text-blue-800 text-3xl text-center">
          Create New Password
        </h1>
        <p className="font-medium text-gray-700 text-sm text-center">
          Your new password must be different from your previous password
        </p>

        {success ? (
          <div className="bg-green-100 text-green-700 px-4 py-6 rounded-lg text-center my-4">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold text-lg mb-2">Password Changed Successfully!</h3>
            <p>Redirecting you to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* New Password input */}
            <div className="relative">
              <div className="bg-blue-100 flex items-center rounded-2xl gap-2.5 px-5 py-3 border border-blue-200">
                <MdLock className="w-6 h-6 text-blue-800" />
                <input
                  className="flex-1 w-full pl-2 py-1 bg-transparent focus:outline-none text-blue-900"
                  type={showPassword.newPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => togglePasswordVisibility("newPassword")} className="text-blue-800">
                  {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password input */}
            <div className="relative">
              <div className="bg-blue-100 flex items-center rounded-2xl gap-2.5 px-5 py-3 border border-blue-200">
                <MdLock className="w-6 h-6 text-blue-800" />
                <input
                  className="flex-1 w-full pl-2 py-1 bg-transparent focus:outline-none text-blue-900"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => togglePasswordVisibility("confirmPassword")} className="text-blue-800">
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Password rules */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">Password must have:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {passwordRules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`flex items-center gap-2 ${
                      newPassword && rule.test(newPassword)
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {newPassword && rule.test(newPassword) ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-xs">{rule.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="w-full sm:w-2/3 text-white font-bold cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl px-5 py-3 text-center transition-all duration-300 ease-in-out hover:scale-105 shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Change Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
