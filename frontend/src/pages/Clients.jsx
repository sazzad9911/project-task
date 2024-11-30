import React from "react";
import PropTypes from "prop-types";
import QuotesReport from "../components/QuotesReport";
import DifficultClients from "../components/ClientsList";
import LargestDriveway from "../components/LargestDriveway";
import OverdueBills from "../components/OverdueBills";

function Clients() {
  const [selected, setSelected] = React.useState("Quotes Report");

  return (
    <div className="mx-4 my-5 ">
      <p className="text-xl font-semibold text-center md:text-2xl md:mt-5">
        Clients
      </p>
      <div className="flex flex-wrap gap-3 px-2 py-2 my-5 border rounded-md">
        <Button
          onClick={setSelected}
          isActive={selected}
          title={"Quotes Report"}
        />
        <Button
          onClick={setSelected}
          isActive={selected}
          title={"Big Clients"}
        />
        <Button
          isActive={selected}
          onClick={setSelected}
          title={"Difficult Clients"}
        />
        <Button
          isActive={selected}
          onClick={setSelected}
          title={"Prospective Clients"}
        />
        <Button
          isActive={selected}
          onClick={setSelected}
          title={"Bad Clients"}
        />
        <Button
          isActive={selected}
          onClick={setSelected}
          title={"Good Clients"}
        />
        <Button
          isActive={selected}
          onClick={setSelected}
          title={"Largest Driveway"}
        />
        <Button
          isActive={selected}
          onClick={setSelected}
          title={"Overdue Bills"}
        />
      </div>
      {selected === "Quotes Report" ? (
        <QuotesReport />
      ) : selected.includes("Clients") ? (
        <DifficultClients name={selected} />
      ) : selected === "Largest Driveway" ? (
        <LargestDriveway />
      ) : selected === "Overdue Bills" ? (
        <OverdueBills />
      ) : null}
    </div>
  );
}

const Button = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(title)}
      className={`w-[150px] text-sm flex justify-center items-center text-white py-2 rounded-full ${
        isActive === title ? "bg-black" : "hover:bg-gray-700 bg-gray-500"
      }`}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Clients;
