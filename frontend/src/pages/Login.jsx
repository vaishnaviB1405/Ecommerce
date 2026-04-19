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
        email,
        password
      });

      // ✅ token
      localStorage.setItem("token", response.data.token);

      // ✅ IMPORTANT FIX
      localStorage.setItem("user", JSON.stringify({
        userId: response.data.user.userId,
        name: response.data.user.name,
        email: response.data.user.email
      }));

      alert("Login successful ✅");

      navigate("/");
      window.location.reload();

    } catch (error) {
      setErrorMsg("Invalid credentials ❌");
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

        <input
          required
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-black"
        />

        <input
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-black"
        />

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
        >
          Login
        </button>

        <Link to="/register" className="text-blue-500 text-sm text-center">
          Create Account
        </Link>

      </form>

    </div>
  );
};

export default Login;