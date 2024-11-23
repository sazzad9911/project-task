import { useState } from "react";
import { FaBars, FaColumns, FaPlusCircle, FaClipboardList, FaCreditCard } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:w-64 w-20 bg-blue-200 text-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex justify-between items-center lg:block">
        <h2 className="hidden lg:block text-2xl font-bold">Client</h2>
        <FaBars
          className="lg:hidden text-xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar Links */}
      <ul className={`flex-col lg:flex ${isOpen ? "block" : "hidden"} lg:block`}>
        <li className="flex items-center gap-4 py-3 px-4 hover:bg-blue-300 transition">
          <FaColumns />
          <span className="hidden lg:block">Dashboard</span>
        </li>
        <li className="flex items-center gap-4 py-3 px-4 hover:bg-blue-300 transition">
          <FaPlusCircle />
          <span className="hidden lg:block">New Quotes</span>
        </li>
        <li className="flex items-center gap-4 py-3 px-4 hover:bg-blue-300 transition">
          <FaClipboardList />
          <span className="hidden lg:block">Orders</span>
        </li>
        <li className="flex items-center gap-4 py-3 px-4 hover:bg-blue-300 transition">
          <FaCreditCard />
          <span className="hidden lg:block">Payments</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
