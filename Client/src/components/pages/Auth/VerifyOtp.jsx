import React, { useState, useRef, useEffect } from "react";
import { Shield, ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import { UserData } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./VerifyOtp.css"
export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const { verifyOtp } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    if (otp.some((digit) => !digit)) return;

    // setIsVerifying(true);

    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // console.log(otp.join(''))
    const joinOtp = otp.join("");

    await verifyOtp(Number(joinOtp), navigate);
    // setIsVerifying(false);
    setIsVerified(true);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    setIsVerified(false);
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  if (isVerified) {
    return; // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center p-4">
    //   <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md text-center border border-white/20 shadow-2xl">
    //     <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
    //       <CheckCircle size={40} className="text-white" />
    //     </div>
    //     <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
    //       Verified Successfully!
    //     </h1>
    //     <p className="text-gray-300 mb-6">
    //       Your account has been verified. You can now access all features.
    //     </p>
    //     <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
    //       Continue to Dashboard
    //     </button>
    //   </div>
    // </div>
  }
  const [recaptureShow, setRecaptureShow] = useState(false);
  function recaptureChange(value) {
    console.log("Captcha value:", value);
    setRecaptureShow(true);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900  to-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Verify Your Account
          </h1>
          <p className="text-gray-300 text-sm">
            Enter the 6-digit code sent to your Email Id
          </p>
          <p className="text-purple-300 font-medium"></p>
        </div>

        {/* OTP Input */}
        <div className="mb-8">
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleInputChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-8 h-10 md:w-10 md:h-12 lg:w-12 lg:h-14 bg-white/5 border-2 border-white/20 rounded-xl text-center text-xl font-bold text-white focus:border-purple-400 focus:bg-white/10 transition-all duration-300 outline-none hover:border-white/30"
                disabled={isVerifying}
              />
            ))}
          </div>

          {/* Verify Button */}
          <div className="flex justify-center mt-5">
            <div className="g-recaptcha-wrapper">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={recaptureChange}
                theme="light"
                size="normal"
              />
            </div>
          </div>
          {recaptureShow && (
            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying}
              className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform flex items-center justify-center gap-2 shadow-lg ${
                isComplete && !isVerifying
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  Verify Code
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-gray-300 text-sm mb-3">Didn't receive the code?</p>

          {canResend ? (
            <button
              onClick={handleResend}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 flex items-center justify-center gap-2 mx-auto group"
            >
              <RotateCcw
                size={16}
                className="group-hover:rotate-180 transition-transform duration-300"
              />
              Resend Code
            </button>
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Resend in {timer}s
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-xs text-gray-400">
            Having trouble?{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
