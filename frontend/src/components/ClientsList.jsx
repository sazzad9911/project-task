import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import url from "../variables/url";
import axios from "axios";
import PropTypes from "prop-types";

function DifficultClients({ name }) {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const getUrl = (key) => {
    return `${url}/api/users/${
      key === "Big Clients"
        ? "big-clients"
        : key === "Difficult Clients"
        ? "difficult-clients"
        :key==="Prospective Clients"
        ? "prospective-clients"
        :key==="Good Clients"
        ?"good-clients"
        :key==="Bad Clients"
        ?"bad-clients"
        : ""
    }`;
  };
  useEffect(() => {
    const credentials = btoa(`${user.email}:${user.password}`);
    axios
      .get(getUrl(name), {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      })
      .then((res) => {
        setData(res.data);
        //console.log(res.data);
      });
  }, [name]);
  return (
    <div className="w-full ">
      <div className="mb-2 font-medium">
        {name}({data.length})
      </div>
      {data.map((doc, i) => (
        <Card
          key={i}
          index={i}
          firstName={doc.firstName}
          lastName={doc.lastName}
          phone={doc.phone}
          address={doc.address}
          quote={doc.order_count||0}
          date={doc.created_at}
        />
      ))}
    </div>
  );
}

export default DifficultClients;
DifficultClients.propTypes = {
  name: PropTypes.string.isRequired,
};
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
          <span className="font-medium">Joined -</span>
          {new Date(date).toDateString()}
        </p>
        <p className="text-gray-900">
          <span className="font-medium">Total Quotes -</span>
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
