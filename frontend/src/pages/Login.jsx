"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useLoader } from "../providers/LoadingProvider";
import axios from "axios";
import url from "../variables/url";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {login}=useAuth()
  const {showLoader,hideLoader}=useLoader()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoader();
      const res = await axios.post(`${url}/api/users/login`, {
        email: formData.email,
        password: formData.password,
      });
      login(res.data);
      alert("Login successful!");
      window.location.href="/"
    } catch (error) {
      alert(error.response.data);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="flex justify-center items-center p-3 min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-8">
        <h2 className="text-center text-3xl font-bold text-blue-500 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-800">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-6 text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {/* <div className="">
          <a href="/forgot-password" className="text-blue-500 hover:text-blue-600">
            Forgot Password
          </a>
        </div> */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:text-blue-600">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
