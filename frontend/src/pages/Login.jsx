import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email: email,
        password: password
      });

      // ✅ store full user object
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ store correct username (IMPORTANT FIX)
      localStorage.setItem("username", response.data.name);

      alert("Login successful ✅");

      // ✅ redirect to home
      navigate("/");
      window.location.reload();

    } catch (error) {
      setErrorMsg("User not registered or invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-80"
      >

        <h2 className="text-black text-xl font-semibold text-center">
          Login
        </h2>

        {/* Email */}
        <input
          required
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-black"
        />

        {/* Password */}
        <input
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-black"
        />

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-500 text-sm text-center">
            {errorMsg}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        {/* Links */}
        <Link
          to="/forgot-password"
          className="text-blue-500 underline text-sm text-center"
        >
          Forgot Password
        </Link>

        <Link
          to="/register"
          className="text-blue-500 underline text-sm text-center"
        >
          Create Account
        </Link>

      </form>

    </div>
  );
};

export default Login;