"use client";
import { useState } from 'react';
import { Modal } from 'antd';
import PropTypes from "prop-types";
import Img1 from "../Data/Img/img-1.png";
import Img2 from "../Data/Img/img-2.jpeg";

const Dashboard = () => {
  return (
    <div className="w-[80] ml-[10%] h-screen flex flex-col justify-start items-center">
      <p className="text-2xl font-semibold mt-5">My Dashboard</p>

      <div className="mt-5 flex gap-20">
        <div className="w-[200px] h-[100px] bg-[#CAD3FF] rounded-lg flex justify-center items-center">
          <p className="font-semibold">22 Orders</p>
        </div>
        <div className="w-[200px] h-[100px] bg-[#CAD3FF] rounded-lg flex justify-center items-center">
          <p className="font-semibold">22 Payments</p>
        </div>
      </div>

      <div className="w-[90%] ml-[9%] mt-10 flex flex-col justify-start items-start">
        <p className="font-semibold">Recent Quotes</p>
        <div className="w-full mt-5">
          <DashboardComponent
            img={Img1}
            place="Gulshan Niketon 1/2"
            budget="13500"
            text="We will not agree on this budget. Please increase..."
            feet="1500sq"
            status="REJECTED"
            updateDate="15 July 2020"
          />
          <DashboardComponent
            img={Img2}
            place="Kajipara, Mirpur"
            budget="8500"
            text="We will not agree on this budget. Please increase..."
            feet="1200sq"
            status="APPROVED"
            updateDate="22 Nov 2020"
          />
          <DashboardComponent
            img={Img1}
            place="Gulshan Niketon 1/2"
            budget="13500"
            text="We will not agree on this budget. Please increase..."
            feet="1500sq"
            status="PENDING"
            updateDate="15 July 2020"
          />
        </div>
      </div>
    </div>
  );
};

const DashboardComponent = ({ img, place, budget, text, feet, status, updateDate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusColor = status === "REJECTED" ? "text-red-500" : status === "APPROVED" ? "text-green-500" : "text-[#9E7400]";

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const [formData, setFormData] = useState({
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Note submission
  const handleSubmit = () => {
    console.log("Note Submitted:", formData.note);
    setFormData({ note: "" }); 
    setIsModalOpen(false);
  };


  return (
    <div className="w-full h-[140px] mb-3 flex rounded-md bg-[#D9D9D9]">
      <div className="w-1/4">
        <img alt="Property" src={img} className="w-full h-[140px] shadow rounded-md" />
      </div>

      <div className="w-3/4 flex justify-between">
        <div className="mt-3 ml-3">
          <div className="flex gap-20">
            <div>
              <p className="font-medium">{place}</p>
              <p className="font-medium">{budget} TK</p>
            </div>
            <div>
              <p className="font-medium">{feet}/feet</p>
              <p className="font-medium">
                Status: <span className={`${statusColor}`}>{status}</span>
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm opacity-70">{text}</p>
          <button className="text-blue-500 underline">More</button>
        </div>

        <div className="mt-3 mr-3 flex flex-col items-center">
          <p className="font-medium">Updated At: {updateDate}</p>
          {status === "APPROVED" ? (
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleModal}
                className="p-2 pl-4 pr-4 bg-red-500 text-white rounded-md"
              >
                Reject
              </button>
              <button className="p-2 pl-4 pr-4 bg-green-500 text-white rounded-md">
                Accept
              </button>
            </div>
          ) : status === "PENDING" ? (
            <button className="mt-5 p-2 pl-4 pr-4 bg-red-500 text-white rounded-md">
              Delete Now
            </button>
          ) : (
            <button className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md">
              Update Now
            </button>
          )}
        </div>
      </div>

      <Modal
        title={`Reject Offer on "${place}"`}
        open={isModalOpen}
        onOk={handleModal}
        onCancel={handleModal}
        footer={null}
      >
        <div className='w-full flex flex-col justify-center items-end'>
          <div className="w-full mt-5 mb-5">
            <label htmlFor="note" className="block font-medium mb-1">
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Write a note"
              value={formData.note}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#CAD3FF]"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleCancel}
              className="p-2 pl-4 pr-4 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="p-2 pl-4 pr-4 bg-green-500 text-white rounded-md">
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

DashboardComponent.propTypes = {
  img: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  feet: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
};

export default Dashboard;
