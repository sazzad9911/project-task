import { NavLink } from "react-router-dom";
import {
  FaPlusCircle,
  FaColumns,
  FaClipboardList,
  FaCreditCard,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`h-screen z-30 top-0 w-[200px] fixed bg-lightBlue ${
          isOpen ? "block" : "hidden"
        } sm:block `}
      >
        <div className="w-full flex justify-end sm:hidden ">
          <IoMdClose
            onClick={() => setIsOpen(false)}
            className="mx-2 my-1"
            size={35}
          />
        </div>
        <div className="flex flex-col items-start py-6 px-5 ">
          <p className="text-2xl mb-5 font-bold">Admin</p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full flex gap-4 items-center text-lg py-2 hover:text-red-600 ${
                isActive ? "text-red-600" : "text-gray-700"
              }`
            }
          >
            <FaColumns />
            Dashboard
          </NavLink>
          <NavLink
            to="/new-quotes"
            className={({ isActive }) =>
              `w-full flex gap-4 items-center text-lg py-2 hover:text-red-600 ${
                isActive ? "text-red-600" : "text-gray-700"
              }`
            }
          >
            <FaPlusCircle />
            New Quotes
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `w-full flex gap-4 items-center text-lg py-2 hover:text-red-600 ${
                isActive ? "text-red-600" : "text-gray-700"
              }`
            }
          >
            <FaClipboardList />
            Orders
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `w-full flex gap-4 items-center text-lg py-2 hover:text-red-600 ${
                isActive ? "text-red-600" : "text-gray-700"
              }`
            }
          >
            <FaCreditCard />
            Payments
          </NavLink>
          <div
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
            className={`w-full flex gap-4 items-center text-lg py-2 hover:text-red-600 text-gray-700 cursor-pointer`}
          >
            <IoLogOutOutline />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
