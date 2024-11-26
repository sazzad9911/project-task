"use client";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating sending a password recovery email
    setSuccessMessage(
      "Password recovery instructions have been sent to your email address."
    );
    console.log("Recovery Email Sent to:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Forgot Password
        </h2>
        {successMessage ? (
          <div className="text-center text-green-600 mb-4">{successMessage}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xyz@example.com"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
            >
              Send Recovery Email
            </button>
          </form>
        )}
        <div className="mt-4 text-center">
          <a href="/signup" className="text-blue-600 hover:underline">
            Back to Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
