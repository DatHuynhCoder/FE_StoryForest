import { useState } from "react";
import { useNavigate } from "react-router";
import { MdEmail } from "react-icons/md";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

const OTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle sending OTP
  const handleSendOTP = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      //sendOTP API 
      const response = await api.post('/api/user/accountAction/sendOTP', {email: email})
      
      if (response.data.success) {
        setIsEmailVerified(true);
        toast.success("OTP sent successfully");
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle OTP verification
  const handleVerifyOTP = async () => {
    const otpCode = otpValues.join("");
    
    if (otpCode.length !== 6) {
      setError("Please enter a complete OTP code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual verifyOTP API call
      const response = await api.post('/api/user/accountAction/verifyOTP', {email: email, otp: otpCode});
      
      if (response.data.success) {
        toast.success("OTP verified successfully");
        navigate("/changepass", { state: {email: email, otp: otpCode} });
      } else {
        setError(response.data.message || "Invalid OTP code");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input if value is entered
    if (value !== "" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle key press in OTP input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Handle pasting OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
      const newOtpValues = [...otpValues];
      
      for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
        newOtpValues[i] = pastedData[i];
      }
      
      setOtpValues(newOtpValues);
      
      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtpValues.findIndex(val => val === "");
      if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
        document.getElementById(`otp-input-${nextEmptyIndex}`).focus();
      } else {
        document.getElementById(`otp-input-5`).focus();
      }
    }
  };

  return (
    <div className="w-full h-screen bg-cover sm:bg-[url(/images/bg_login_lap.jpg)] bg-[url(/images/bg_login_phone.jpg)] bg-center flex justify-center items-center">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl px-6 py-8 xl:w-3/10 lg:w-2/5 sm:w-1/2 w-11/12 flex flex-col gap-4 shadow-lg">
        {/* Header */}
        <h1 className="font-bold text-blue-800 text-3xl text-center">
          {isEmailVerified ? "Enter Verification Code" : "Verify your Email"}
        </h1>
        
        {/* Email input section */}
        {!isEmailVerified && (
          <>
            <p className="font-medium text-gray-700 text-sm">
              Enter your email to receive a verification code
            </p>
            
            <div className="bg-blue-100 flex items-center rounded-2xl gap-2.5 px-5 py-3 border border-blue-200">
              <MdEmail className="w-6 h-6 text-blue-800" />
              <input
                className="flex-1 w-full pl-2 py-1 bg-transparent focus:outline-none text-blue-900"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}
        
        {/* OTP input section */}
        {isEmailVerified && (
          <>
            <p className="font-medium text-gray-700 text-sm">
              Enter the 6-digit code we've sent to <span className="font-semibold">{email}</span>
            </p>
            
            <div className="flex justify-center gap-2 my-4">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  className="w-12 h-14 text-center text-xl font-bold bg-blue-50 border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 shadow-sm"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                type="button"
                className="cursor-pointer text-blue-800 text-sm underline font-medium"
                onClick={handleSendOTP}
                disabled={isLoading}
              >
                Resend Code
              </button>
            </div>
          </>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {/* Action button */}
        <div className="flex justify-center mt-2">
          <button
            type="button"
            className="w-full sm:w-2/3 text-white font-bold cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl px-5 py-3 text-center transition-all duration-300 ease-in-out hover:scale-105 shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={isEmailVerified ? handleVerifyOTP : handleSendOTP}
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
            ) : isEmailVerified ? (
              "Verify Account"
            ) : (
              "Send Verification Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;