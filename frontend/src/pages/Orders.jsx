import PropTypes from "prop-types";
import Img1 from "../Data/Img/img-1.png";
import Img2 from "../Data/Img/img-2.jpeg";
import DashboardComponent from "../components/DashboardComponent";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import url from "../variables/url";

const Orders = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const credentials = btoa(`${user.email}:${user.password}`);
    axios
      .get(`${url}/api/quotes/order-user?type=order`, {
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
    <div className="flex flex-col justify-start items-center mx-4 my-5">
      <p className="text-xl md:text-2xl font-semibold md:mt-5">Orders Page({data.length})</p>

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
  );
};

export default Orders;
