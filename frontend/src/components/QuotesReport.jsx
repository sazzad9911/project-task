import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import url from "../variables/url";
import AdminDashboardComponent from "./AdminDashboardComponent";

function QuotesReport() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [options,setOptions]=useState([])
  const credentials = btoa(`${user.email}:${user.password}`);
  
  useEffect(() => {
    axios.get(`${url}/api/quotes/report?month=${month}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }).then(res=>{
        setData(res.data.data)
        setOptions(res.data.keys)
    })
  }, [month]);

  return (
    <div>
      <Select options={options} value={month} onChange={setMonth} />
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
const Select = ({ options, onChange, value }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-md"
    >
      {" "}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {" "}
          {option}{" "}
        </option>
      ))}{" "}
    </select>
  );
};
Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default QuotesReport;
