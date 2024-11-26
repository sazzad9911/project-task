import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewQuotes from "./pages/NewQuotes";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { user } = useAuth();
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    );
  }
  return (
    <div className="">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 sm:ml-[200px] ">
        <div className="max-w-[1000px] mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-quotes" element={<NewQuotes />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </div>

      {/* <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes> */}
    </div>
  );
};

export default App;
