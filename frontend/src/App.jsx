import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewQuotes from "./pages/NewQuotes";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg- p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-quotes" element={<NewQuotes />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>

      {/* <Routes>
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      </Routes> */}
    </div>
  );
};

export default App;
