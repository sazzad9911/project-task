"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoader } from "../providers/LoadingProvider";
import axios from "axios";
import url from "../variables/url";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    creditNo: "",
    creditDate: "",
    creditCVC: "",
    address: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      showLoader();
      const res = await axios.post(`${url}/api/users/create`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        cardNumber: formData.creditNo,
        expiry: formData.creditDate,
        cvc: formData.creditCVC,
      });
      login(res.data);
      alert("Signup successful!");
      window.location.href="/"
    } catch (error) {
      alert(error.response.data);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500">
      <div className="w-full max-w-md mt-5 mb-5 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {/* Phone No */}
          <div>
            <label className="block font-medium">Phone No</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone No"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {/* Credit Card Info */}
          <div>
            <label className="block font-medium">Credit Card Info</label>
            <input
              type="text"
              name="creditNo"
              placeholder="Card Number"
              value={formData.creditNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              maxLength={16}
              required
            />
            <div className="mt-3 flex justify-between gap-3">
              <input
                type="text"
                name="creditDate"
                placeholder="MM/YY"
                value={formData.creditDate}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded px-3 py-2"
                maxLength={5}
                required
              />
              <input
                type="text"
                name="creditCVC"
                placeholder="CVC"
                value={formData.creditCVC}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded px-3 py-2"
                maxLength={4}
                required
              />
            </div>
          </div>
          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-3 text-gray-500"
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
