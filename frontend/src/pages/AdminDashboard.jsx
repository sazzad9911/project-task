import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import url from "../variables/url";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrder: 0,
    totalPayment: 0,
    totalRevenue: 0,
    monthly: [
      {
        month: "JUN 2024",
        revenue: 0,
      },
      {
        month: "JUL 2024",
        revenue: 0,
      },
      {
        month: "AUG 2024",
        revenue: 0,
      },
      {
        month: "SEP 2024",
        revenue: 0,
      },
      {
        month: "OCT 2024",
        revenue: 0,
      },
      {
        month: "NOV 2024",
        revenue: 0,
      },
    ],
  });
  const {user}=useAuth()
  useEffect(() => {
    const credentials = btoa(`${user.email}:${user.password}`);
    axios
      .get(`${url}/api/quotes/dashboard`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })
      .then((res) => {
        setDashboardData(res.data);
        //console.log(res.data);
      });
  }, []);
  return (
    <div className=" mx-4 my-5">
      <p className="text-xl md:text-2xl font-semibold md:mt-5 text-center">
        My Dashboard
      </p>

      <div className="my-4 flex justify-center flex-wrap gap-5">
        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">{dashboardData.totalOrder} Orders</p>
        </div>
        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">{dashboardData.totalPayment} Payments</p>
        </div>

        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">{((dashboardData.totalRevenue)/1000).toFixed(1)}K Revenue</p>
        </div>
      </div>

      <div className="w-full mt-5 md:mt-10 flex justify-center items-center">
        <BarChart monthly={dashboardData.monthly} />
      </div>
    </div>
  );
}
