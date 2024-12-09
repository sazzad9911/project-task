import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import url from "../variables/url";
const DashboardComponent = ({
  img,
  place,
  budget,
  text,
  feet,
  status,
  updateDate,
  data,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [height, setHeight] = useState("100%");
  const { user } = useAuth();
  const credentials = btoa(`${user.email}:${user.password}`);
  const [payModal, setPayModal] = useState(false);
  const ref = useRef();
  console.log(data);
  const [paymentNote, setPaymentNote] = useState("");
  const statusColor =
    status === "REJECTED"
      ? "text-red-500"
      : status === "ACCEPTED"
      ? "text-green-500"
      : status === "REJECT"
      ? "text-red-500"
      : "text-[#9E7400]";

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/quotes/delete?id=${data.id}`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      alert("Quote deleted successfully");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  //console.log(ref.current.offsetHeight)
  useEffect(() => {
    if (ref.current) {
      setHeight(ref?.current?.offsetHeight);
    }
  }, [ref]);
  const handleAccept = async () => {
    try {
      await axios.post(
        `${url}/api/quotes/accept-user`,
        {
          id: data.id,
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      alert("Accepted");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  const handleReject = async () => {
    try {
      await axios.post(
        `${url}/api/quotes/reject-user`,
        {
          id: data.id,
          customerNote: formData.note,
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      alert("Rejected!");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  const handlePay = async () => {
    try {
      await axios.post(
        `${url}/api/quotes/pay`,
        {
          id: data.id,
          price: data?.offerPrice - (data.offer || 0),
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      alert("Paid!");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  const cancelPay = async () => {
    try {
      await axios.put(
        `${url}/api/quotes/payment-reject`,
        {
          id: data.id,
          note: paymentNote,
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      alert("Cancelled!");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <div
      ref={ref}
      className="w-full flex flex-wrap bg-[#D9D9D9]  min-h-[150px]"
    >
      <img
        alt="Property"
        src={img}
        style={{
          height: height,
        }}
        className="w-full max-h-[300px] hover:opacity-35 cursor-pointer h-full md:max-w-[200px] md:min-h-full rounded-md object-cover"
      />

      <div className="grid flex-1 grid-cols-2 gap-6 mx-2 my-2 xl:grid-cols-3">
        <div className=" xl:col-span-2">
          <div className="justify-between w-full xl:flex">
            <div>
              <p className="font-medium">{place}</p>
              <p className="font-medium">${budget}</p>
            </div>
            <div className="my-2 xl:my-0">
              <p className="font-medium">{feet}/feet</p>
              {data?.ordered ? (
                <p className="font-medium">
                  Status:{" "}
                  <span
                    className={`${
                      data.paid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {data.paid ? "PAID" : "UNPAID"}
                  </span>
                </p>
              ) : (
                <p className="font-medium">
                  Status: <span className={`${statusColor}`}>{status}</span>
                </p>
              )}
            </div>
          </div>
          <div className="mt-2">
            {status === "REJECTED" && !user.isAdmin ? (
              <p className="text-sm opacity-70">
                <span className="font-semibold">Admin Note: </span>
                {data.adminNote}
              </p>
            ) : status === "ACCEPTED" ? (
              <>
                <p>
                  <span className="font-semibold">Offer Price: </span>$
                  {data.offerPrice}
                </p>
                <p>
                  <span className="font-semibold">Discount Price: </span>$
                  {data.offer || "0"}
                </p>
                <p>
                  <span className="font-semibold">Deadline: </span>
                  {new Date(data.startDate).toDateString()} {" -To- "}
                  {new Date(data.endDate).toDateString()}
                </p>
              </>
            ) : (
              <p className="text-sm opacity-70">
                <span className="font-semibold">Client Note: </span>
                {data.customerNote}
              </p>
            )}
            {data?.payment_status === "PENDING" ? (
              <p className="text-sm opacity-70">
                <span className="font-semibold">Admin Note: </span>
                {data.adminNote}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex-1 xl:col-span-1 ">
          <p className="font-medium">Updated At: {updateDate}</p>
          {status === "ACCEPTED" && !data?.ordered ? (
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={handleModal}
                className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="p-2 pl-4 pr-4 text-white bg-green-500 rounded-md"
              >
                Accept
              </button>
            </div>
          ) : status === "PENDING" ? (
            <button
              onClick={handleDelete}
              className="p-2 pl-4 pr-4 mt-5 text-white bg-red-500 rounded-md"
            >
              Delete Now
            </button>
          ) : status === "REJECT" || status === "REJECTED" ? (
            <button className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md">
              Update Now
            </button>
          ) : data?.ordered &&
            data?.payment_request &&
            !data?.paid &&
            data?.payment_status === "PENDING" ? (
            <div className="flex gap-2">
              <button
                onClick={handlePay}
                className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md"
              >
                Pay Now
              </button>
              <button
                onClick={() => setPayModal(true)}
                className="mt-5 p-2 pl-4 pr-4 bg-[#c23737] text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          ) : (
            <></>
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
        <div className="flex flex-col items-end justify-center w-full">
          <div className="w-full mt-5 mb-5">
            <label htmlFor="note" className="block mb-1 font-medium">
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
              className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              className="p-2 pl-4 pr-4 text-white bg-green-500 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title={`Reject Offer on "${place}"`}
        open={payModal}
        onOk={() => setPayModal(false)}
        onCancel={() => setPayModal(false)}
        footer={null}
      >
        <div className="flex flex-col items-end justify-center w-full">
          <div className="w-full mt-5 mb-5">
            <label htmlFor="note" className="block mb-1 font-medium">
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Write a note"
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#CAD3FF]"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setPayModal(false)}
              className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={cancelPay}
              className="p-2 pl-4 pr-4 text-white bg-green-500 rounded-md"
            >
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
  data: PropTypes.any,
};
export default DashboardComponent;
