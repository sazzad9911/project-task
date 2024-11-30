import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import url from "../variables/url";
import axios from "axios";
import PropTypes from "prop-types";

function OverdueBills() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    const credentials = btoa(`${user.email}:${user.password}`);
    axios
      .get(`${url}/api/quotes/overdue`, {
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
    <div className="w-full ">
      <div className="mb-2 font-medium">
        Overdue Bills({data.length})
      </div>
      {data.map((doc, i) => (
        <Card
          key={i}
          index={i}
          firstName={doc.firstName}
          lastName={doc.lastName}
          phone={doc.phone}
          address={doc.address}
          quote={doc.amount}
          date={doc.create_at}
        />
      ))}
    </div>
  );
}

export default OverdueBills;

const Card = ({ firstName, lastName, phone, address, quote, index ,date}) => {
  return (
    <div className="flex flex-wrap gap-6 px-3 py-2 border rounded-md">
      <div className="flex items-center justify-center text-lg font-bold">
        {index + 1}
      </div>
      <div>
        <p className="font-medium">
          {firstName} {lastName}
        </p>
        <p>{phone}</p>
        <p className="text-sm text-gray-500">{address}</p>
      </div>
      <div>
        <p className="text-gray-500">
          <span className="font-medium">Created -</span>
          {new Date(date).toDateString()}
        </p>
        <p className="text-gray-900">
          <span className="font-medium">Total Amount -</span>
          {quote}
        </p>
      </div>
    </div>
  );
};
Card.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  quote: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  date:PropTypes.string.isRequired
};
