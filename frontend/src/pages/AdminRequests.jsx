import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import url from "../variables/url";
import AdminDashboardComponent from "../components/AdminDashboardComponent";

export default function AdminRequests() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const credentials = btoa(`${user.email}:${user.password}`);
    axios
      .get(`${url}/api/quotes/order-admin?type=dashboard`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })
      .then((res) => {
        setData(res.data);
        //console.log(res.data);
      });
  }, []);
  
  return (
    <div className=" mx-4 my-5">
      <p className="text-xl md:text-2xl font-semibold md:mt-5 text-center">
        My Requests
      </p>

      <div className="flex flex-col items-start justify-start ">
        <p className="font-semibold">Recent Quotes({data.length})</p>
        <div className="flex flex-col w-full gap-5 mt-5 ">
          {data.map((doc, i) => (
            <AdminDashboardComponent
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
}
