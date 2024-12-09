import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import url from "../variables/url";
import axios from "axios";
const AdminDashboardComponent = ({
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [height, setHeight] = useState("100%");
  const [paymentModal,setPaymentModal] = useState(false); 
  const [discount,setDiscount]=useState()
  const [note,setNote]=useState()
  const { user } = useAuth();
  const credentials = btoa(`${user.email}:${user.password}`);
  const ref = useRef();
  console.log(data);
  const statusColor =
    status === "REJECTED" || status === "REJECT"
      ? "text-red-500"
      : status === "PAID"
      ? "text-green-500"
      : status === "ACCEPTED"
      ? "text-green-500"
      : "text-[#9E7400]";

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModal2 = () => {
    setIsModalOpen2(!isModalOpen2);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  // For Img view
  const handleModal3 = () => {
    setIsModalOpen3(!isModalOpen3);
  };
  // const handleCancel3 = () => {
  //   setIsModalOpen3(false);
  // };

  const [formData, setFormData] = useState({
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Accept Modal State and Handlers
  const [formData2, setFormData2] = useState({
    price: "",
    startDate: "",
    endDate: "",
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  useEffect(() => {
    if (ref.current) {
      setHeight(ref?.current?.offsetHeight);
    }
  }, [ref]);

  const handleAccept = async () => {
    try {
      await axios.post(
        `${url}/api/quotes/accept-admin`,
        {
          id: data?.id,
          offerPrice: formData2.price,
          startDate: formData2.startDate,
          endDate: formData2.endDate,
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      alert("Accepted!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const handleReject = async () => {
    try {
      await axios.post(
        `${url}/api/quotes/reject-admin`,
        {
          id: data.id,
          adminNote: formData.note,
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
  const handlePaymentRequest = async () => {
    try {
      await axios.post(
        `${url}/api/quotes/payment-request`,
        {
          id: data.id,
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      alert("Requested!");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  const updatePaymentRequest = async () => {
    try {
      await axios.put(
        `${url}/api/quotes/payment-update`,
        {
          id: data.id,
          note:note,
          discount:discount
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      alert("Requested!");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <div
      ref={ref}
      className="w-full flex flex-wrap bg-[#D9D9D9]   min-h-[150px]"
    >
      <img
        alt="Property"
        src={img}
        style={{
          height: height,
        }}
        onClick={handleModal3}
        className="w-full hover:opacity-35 cursor-pointer h-full md:max-w-[200px] md:min-h-full rounded-md object-cover"
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
            {data.status === "ACCEPTED" ? (
              <>
                <p>
                  <span className="font-semibold">Offer Price: </span>$
                  {data.offerPrice}
                </p>
                {data?.offer?(
                  <p>
                  <span className="font-semibold">Discount Price: </span>$
                  {data.offer||"0"}
                </p>
                ):null}
                <p>
                  <span className="font-semibold">Deadline: </span>
                  {new Date(data.startDate).toDateString()}
                  {" -To- "}
                  {new Date(data.endDate).toDateString()}
                </p>
              </>
            ) : (
              <p className="text-sm opacity-70">
                <span className="font-semibold">Client Note: </span>
                {data.customerNote}
              </p>
            )}
            {data?.payment_status === "REJECTED" ? (
              <p className="mt-1 text-sm opacity-70">
                <span className="font-semibold">Client Note: </span>
                {data.customerNote}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex-1 xl:col-span-1 ">
          <p className="font-medium">Updated At: {updateDate}</p>
          {status === "PENDING" ? (
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={handleModal}
                className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
              >
                Reject
              </button>
              <button
                onClick={handleModal2}
                className="p-2 pl-4 pr-4 text-white bg-green-500 rounded-md"
              >
                Accept
              </button>
            </div>
          ) : !data.paid && !data.payment_request && data.ordered ? (
            <button
              onClick={handlePaymentRequest}
              className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md"
            >
              Payment Request
            </button>
          ) : data?.payment_status === "REJECTED" ? (
            <button
              onClick={()=>setPaymentModal(true)}
              className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md"
            >
              Update Request
            </button>
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
        title={`Accept Offer on "${place}"`}
        open={isModalOpen2}
        onOk={handleModal2}
        onCancel={handleModal2}
        footer={null}
      >
        <div className="flex flex-col items-end justify-center w-full">
          <div className="w-full mt-5 mb-5">
            <label className="block font-medium">Offer Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange2}
              placeholder="Price"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded outline-none"
              required
            />
          </div>

          <div className="w-full mb-5 md:flex md:justify-between">
            <div className="w-full md:w-[45%]">
              <label className="block font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange2}
                placeholder="Price"
                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded outline-none"
                required
              />
            </div>

            <div className="w-full md:w-[45%] mt-5 md:mt-0">
              <label className="block font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange2}
                placeholder="Price"
                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleCancel2}
              className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              className="p-2 pl-4 pr-4 text-white bg-green-500 rounded-md"
            >
              Accept
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title="View All Images"
        open={isModalOpen3}
        onOk={handleModal3}
        onCancel={handleModal3}
        footer={null}
      >
        <div className="flex flex-col items-start justify-center w-full">
          <div className="">
            <p className="mt-5 mb-3 font-serif text-xl">Image -1</p>
            <img
              alt="Property"
              src={img}
              style={{
                height: height,
              }}
              onClick={handleModal3}
              className=""
            />
            <p className="mt-5 mb-3 font-serif text-xl">Image -2</p>
            <img
              alt="Property"
              src={url + data.image2}
              style={{
                height: height,
              }}
              onClick={handleModal3}
              className=""
            />
            <p className="mt-5 mb-3 font-serif text-xl">Image -3</p>
            <img
              alt="Property"
              src={url + data.image3}
              style={{
                height: height,
              }}
              onClick={handleModal3}
              className=""
            />
            <p className="mt-5 mb-3 font-serif text-xl">Image -4</p>
            <img
              alt="Property"
              src={url + data.image4}
              style={{
                height: height,
              }}
              onClick={handleModal3}
              className=""
            />
            <p className="mt-5 mb-3 font-serif text-xl">Image -5</p>
            <img
              alt="Property"
              src={url + data.image5}
              style={{
                height: height,
              }}
              onClick={handleModal3}
              className=""
            />
          </div>
        </div>
      </Modal>
      <Modal
        title={`Reject Offer on "${place}"`}
        open={paymentModal}
        onOk={()=>setPaymentModal(false)}
        onCancel={()=>setPaymentModal(false)}
        footer={null}
      >
        <div className="flex flex-col items-end justify-center w-full">
        <div className="w-full mt-5 mb-5">
            <label htmlFor="note" className="block mb-1 font-medium">
              Discount:
            </label>
            <input type="number"
              id="note"
              name="note"
              placeholder="Any discount amount"
              value={discount}
              onChange={e=>setDiscount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#CAD3FF]"
              
            />
          </div>
          <div className="w-full mt-5 mb-5">
            <label htmlFor="note" className="block mb-1 font-medium">
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Write a note"
              value={note}
              onChange={e=>setNote(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#CAD3FF]"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={()=>setPaymentModal(false)}
              className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={updatePaymentRequest}
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

AdminDashboardComponent.propTypes = {
  img: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  feet: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
};
export default AdminDashboardComponent;
