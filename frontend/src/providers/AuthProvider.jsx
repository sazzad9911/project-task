import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Create Auth Context
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = (userData) => {
    setUser(userData); // Save user data to state
    localStorage.setItem("user", JSON.stringify(userData)); // Persist to localStorage
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear user data from state
    localStorage.removeItem("user"); // Clear from localStorage
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // Provide values to children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes for validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
