"use client";

import { useEffect, useState } from "react";
import DashboardComponent from "../components/DashboardComponent";
import axios from "axios";
import url from "../variables/url";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalOrder: 0,
    totalPayment: 0,
  });

  useEffect(() => {
    const credentials = btoa(`${user.email}:${user.password}`);
    axios
      .get(`${url}/api/quotes/order-user?type=dashboard`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })
      .then((res) => {
        setData(res.data);
        //console.log(res.data);
      });
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
    <div className="mx-4 my-5 ">
      <p className="text-xl font-semibold text-center md:text-2xl md:mt-5">
        My Dashboard
      </p>

      <div className="flex flex-wrap justify-center gap-5 my-4">
        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">{dashboardData.totalOrder} Orders</p>
        </div>
        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">{dashboardData.totalPayment} Payments</p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start ">
        <p className="font-semibold">Recent Quotes({data.length})</p>
        <div className="flex flex-col w-full gap-5 mt-5 ">
          {data.map((doc, i) => (
            <DashboardComponent
              key={i}
              img={`${url}${doc.image1}`}
              place={doc.address}
              budget={doc.budget.toString()}
              text="We will not agree on this budget. Please increase..."
              feet={`${doc.area}sq`}
              status={doc.status}
              updateDate={new Date(doc.update_at).toDateString()}
              data={doc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
