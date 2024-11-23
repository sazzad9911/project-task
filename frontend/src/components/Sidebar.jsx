import { FaPlusCircle, FaColumns, FaClipboardList, FaCreditCard } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-200 text-gray-800 px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Client</h2>

      <ul>
        <li className="flex items-center gap-4 py-2 hover:text-red-600 transition">
          <FaColumns />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center gap-4 py-2 hover:text-red-600 transition">
          <FaPlusCircle />
          <span>New Quotes</span>
        </li>
        <li className="flex items-center gap-4 py-2 hover:text-red-600 transition">
          <FaClipboardList />
          <span>Orders</span>
        </li>
        <li className="flex items-center gap-4 py-2 hover:text-red-600 transition">
          <FaCreditCard />
          <span>Payments</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
