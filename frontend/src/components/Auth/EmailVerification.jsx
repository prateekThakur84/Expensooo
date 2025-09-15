import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaCheckCircle, FaExclamationCircle, FaSyncAlt } from "react-icons/fa";

const EmailVerification = ({
  email,
  tempUserId,
  onVerifySuccess,
  onBack,
  loading = false,
  error = "",
  attemptsRemaining = null,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 5 && newOtp.every((digit) => digit)) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    if (pasteData.length === 6) handleVerify(pasteData);
  };

  const handleVerify = (otpCode = null) => {
    const code = otpCode || otp.join("");
    if (code.length === 6) {
      onVerifySuccess(code);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setResendLoading(true);
    try {
      const response = await fetch("/api/v1/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempUserId }),
      });

      if (response.ok) {
        setTimer(120);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      console.error("Error resending verification:", error);
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Icon + Heading */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaEnvelope className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Verify Your Email</h2>
        <p className="text-gray-600 text-sm mt-1">We’ve sent a 6-digit code to:</p>
        <p className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm inline-block mt-2">
          {email}
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="mb-6">
        <div className="flex justify-center gap-2 sm:gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
              disabled={loading}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg">
            <FaExclamationCircle className="w-4 h-4" />
            <div>
              <div>{error}</div>
              {attemptsRemaining !== null && (
                <div className="mt-1 font-medium">{attemptsRemaining} attempts remaining</div>
              )}
            </div>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={() => handleVerify()}
          disabled={loading || otp.some((digit) => !digit)}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSyncAlt className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="w-4 h-4" />
              <span>Verify Email</span>
            </>
          )}
        </button>
      </div>

      {/* Resend Section */}
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
        {!canResend ? (
          <p className="text-gray-500 text-sm">Resend in {formatTime(timer)}</p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-primary font-medium text-sm hover:underline disabled:opacity-50"
          >
            {resendLoading ? "Sending..." : "Resend Code"}
          </button>
        )}
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <button onClick={onBack} className="text-gray-500 text-sm hover:underline">
          ← Back to Registration
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
