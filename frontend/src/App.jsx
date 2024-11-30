import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewQuotes from "./pages/NewQuotes";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import AdminSidebar from "./components/AdminSideBar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminOrders from "./pages/AdminOrders";
import AdminPayments from "./pages/AdminPayments";
import Clients from "./pages/Clients";

const App = () => {
  const { user } = useAuth();
  //console.log(user);
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    );
  }
  if (user?.isAdmin) {
    return (
      <div className="">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 sm:ml-[200px] ">
          <div className="max-w-[1000px] mx-auto">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/requests" element={<AdminRequests />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/payments" element={<AdminPayments />} />
              <Route path="/clients" element={<Clients />} />
            </Routes>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default App;
