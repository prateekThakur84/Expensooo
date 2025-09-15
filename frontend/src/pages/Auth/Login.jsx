import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import EmailVerification from "../../components/Auth/EmailVerification";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import DemoCredentials from "../../components/DemoCredentials";
import Loading from "../../components/Loading";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email verification states (for unverified users)
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [tempUserId, setTempUserId] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetErrors = () => {
    setError("");
    setVerificationError("");
    setAttemptsRemaining(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetErrors();

    const emailTrimmed = email.trim().toLowerCase();

    if (!validateEmail(emailTrimmed)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: emailTrimmed,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        toast.success(`Welcome back, ${user.fullName}!`);
        navigate("/dashboard");
      }
    } catch (err) {
      const respData = err.response?.data;
      if (respData?.requiresVerification) {
        setTempUserId(respData.tempUserId);
        setShowEmailVerification(true);
        setError(""); // Clear login error on needing verification
        toast.error("Please verify your email address to continue");
      } else if (respData?.message) {
        setError(respData.message);
      } else {
        setError("Something went wrong, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (otp) => {
    setVerificationLoading(true);
    resetErrors();

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_EMAIL, {
        tempUserId,
        otp,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        toast.success("🎉 Email verified successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      const errorData = err.response?.data;
      setVerificationError(errorData?.message || "Invalid verification code");

      if (errorData?.attemptsRemaining !== undefined) {
        setAttemptsRemaining(errorData.attemptsRemaining);
      }

      if (errorData?.blocked || errorData?.expired) {
        setShowEmailVerification(false);
        setError(errorData.message);
      }
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowEmailVerification(false);
    setTempUserId("");
    resetErrors();
  };

  if (showEmailVerification) {
    return (
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:w-full flex flex-col justify-center">
          <EmailVerification
            email={email}
            tempUserId={tempUserId}
            onVerifySuccess={handleVerifyEmail}
            onBack={handleBackToLogin}
            loading={verificationLoading}
            error={verificationError}
            attemptsRemaining={attemptsRemaining}
          />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="lg:w-[70%] h-3/4 md:w-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
              Please enter your details to log in
            </p>

            <form onSubmit={handleLogin} noValidate>
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="hello@gmail.com"
                type="email"
                required
                aria-required="true"
                autoComplete="email"
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
                required
                aria-required="true"
                autoComplete="current-password"
              />

              {error && (
                <p role="alert" className="text-red-500 text-xs pb-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? <Spinner /> : "LOGIN"}
              </button>

              <p className="text-[13px] text-slate-800 mt-3">
                Don't have an account?{" "}
                <Link className="font-medium text-primary underline" to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
          <DemoCredentials />
        </>
      )}
    </AuthLayout>
  );
};

export default Login;
