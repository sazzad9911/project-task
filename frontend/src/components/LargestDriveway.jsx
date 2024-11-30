import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import url from "../variables/url";
import AdminDashboardComponent from "./AdminDashboardComponent";

function LargestDriveway() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const credentials = btoa(`${user.email}:${user.password}`);

  useEffect(() => {
    axios
      .get(`${url}/api/quotes/area`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })
      .then((res) => {
        setData(res.data)
      });
  }, []);

  return (
    <div>
      <div className="mb-2 font-medium">Largest Driveway({data.length})</div>
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
  );
}

export default LargestDriveway;
