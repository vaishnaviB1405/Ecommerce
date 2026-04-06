import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 SEND EMAIL OTP
  const sendOtp = async () => {
    if (!formData.email) {
      alert("Enter email first");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/api/otp/send-email-otp", {
        email: formData.email
      });

      alert("OTP sent to your email 📩");
      setOtpSent(true);

    } catch (error) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 VERIFY OTP
  const verifyOtp = async () => {
    if (!formData.otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/api/otp/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });

      alert("OTP Verified ✅");
      setOtpVerified(true);

    } catch (error) {
      alert("Invalid OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER USER
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP first");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/user/register", {
        firstName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        
      });

    

      alert("Registration successful 🎉");

      navigate("/login");

    } catch (error) {
         console.log("FULL ERROR:", error);
  console.log("BACKEND ERROR:", error.response?.data);

  alert(JSON.stringify(error.response?.data));
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-80"
      >

        <h2 className="text-black text-xl font-semibold text-center">
          Create Account
        </h2>

        <input
          name="name"
          onChange={handleChange}
          required
          type="text"
          placeholder="Name"
          className="border p-2 rounded text-black"
        />

        <input
          name="email"
          onChange={handleChange}
          required
          type="email"
          placeholder="Email"
          className="border p-2 rounded text-black"
        />

        

        {/* SEND OTP */}
        <button
          type="button"
          onClick={sendOtp}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {/* OTP FIELD */}
        {otpSent && (
          <>
            <input
              name="otp"
              onChange={handleChange}
              placeholder="Enter OTP"
              className="border p-2 rounded text-black"
            />

            <button
              type="button"
              onClick={verifyOtp}
              className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* PHONE */}
        <input
          name="phone"
          onChange={handleChange}
          required
          type="tel"
          placeholder="Phone"
          className="border p-2 rounded text-black"
        />


        <input
          name="password"
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
          className="border p-2 rounded text-black"
        />

        <input
          name="confirmPassword"
          onChange={handleChange}
          required
          type="password"
          placeholder="Re Enter Password"
          className="border p-2 rounded text-black"
        />

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          disabled={!otpVerified}
          className={`p-2 rounded text-white ${
            otpVerified ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register; 