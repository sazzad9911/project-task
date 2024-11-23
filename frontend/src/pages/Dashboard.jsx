

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold">22 Orders</h2>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold">22 Payments</h2>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Quotes</h2>
        <div className="bg-white shadow p-4 rounded-lg flex gap-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Driveway"
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">Gulshan Niketon 1/2</h3>
            <p className="text-gray-600">13500 TK</p>
            <p className="text-sm text-gray-600">1500sq/feet</p>
            <p className="text-red-500 font-bold">Status: REJECTED</p>
            <p className="text-gray-500 text-sm">We will not agree in this budget. Please increase more</p>
          </div>
          <button className="text-blue-500 hover:underline">Update Now</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
