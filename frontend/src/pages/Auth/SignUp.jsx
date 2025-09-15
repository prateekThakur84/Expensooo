import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import EmailVerification from "../../components/Auth/EmailVerification";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const [profilepic, setProfilepic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email verification states
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetErrors();

    // Basic validation with clear user feedback
    if (!fullName.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

    if (!validateEmail(email.toLowerCase().trim())) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      let profileImageUrl = "";

      if (profilepic) {
        const imgUploadRes = await uploadImage(profilepic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        password,
        profileImageUrl,
      });

      if (response.data.requiresVerification) {
        // Show email verification step
        setTempUserId(response.data.tempUserId);
        setShowEmailVerification(true);
        toast.success("Registration successful! Please check your email.");
      } else {
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          updateUser(user);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      const respData = err.response?.data;
      if (respData) {
        if (respData.requiresVerification) {
          setTempUserId(respData.tempUserId);
          setShowEmailVerification(true);
        } else {
          setError(respData.message || "Registration failed");
        }
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
        toast.success("🎉 Email verified successfully! Welcome to Expenso!");
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

  const handleBackToRegistration = () => {
    setShowEmailVerification(false);
    setTempUserId("");
    resetErrors();
  };

  if (showEmailVerification) {
    return (
      <AuthLayout>
        <EmailVerification
          email={email}
          tempUserId={tempUserId}
          onVerifySuccess={handleVerifyEmail}
          onBack={handleBackToRegistration}
          loading={verificationLoading}
          error={verificationError}
          attemptsRemaining={attemptsRemaining}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h3 className="text-2xl font-semibold text-black text-center">
        Create an Account
      </h3>
      <p className="text-sm text-slate-700 text-center mt-2 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="space-y-6">
        <ProfilePhotoSelector image={profilepic} setImage={setProfilepic} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@gmail.com"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
          />
        </div>

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          required
          aria-required="true"
          autoComplete="new-password"
          minLength={8}
        />

        {error && <p role="alert" className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-sm text-slate-800 text-center">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
