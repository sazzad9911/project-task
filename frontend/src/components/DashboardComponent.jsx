import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import url from "../variables/url";
import { useLoader } from "../providers/LoadingProvider";
import { FaTimes, FaUpload } from "react-icons/fa";
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [height, setHeight] = useState("100%");
  const { user } = useAuth();
  const credentials = btoa(`${user.email}:${user.password}`);
  const ref = useRef();
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

  const handleModal2 = () => {
    setIsModalOpen2(!isModalOpen2);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const handleModal3 = () => {
    setIsModalOpen3(!isModalOpen3);
  };

  const [formData, setFormData] = useState({
    note: "",
  });
  const [formData2, setFormData2] = useState({
    address: "",
    area: "",
    budget: "",
    note: "",
  });
  const { showLoader, hideLoader } = useLoader();
  const [images, setImages] = useState(Array(5).fill(null));
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
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };
  //console.log(ref.current.offsetHeight)
  useEffect(() => {
    if (ref.current && data) {
      setHeight(ref?.current?.offsetHeight);
      setFormData2((d) => ({
        ...d,
        address: data.address,
        area: data?.area,
        budget: data?.budget,
        note: data?.customerNote,
      }));
      setImages([
        data.image1,
        data.image2,
        data.image3,
        data.image4,
        data.image5,
      ]);
    }
  }, [ref, data]);
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
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    // Check if all images are uploaded
    if (images.length < 5) {
      return alert("Upload all images");
    }
  
    showLoader();
    try {
      let arr = []; // To store all images (both existing and new)
      const form = new FormData();
  
      // Process images: Add strings directly, add File objects to FormData
      images.forEach((image) => {
        if (typeof image === "string") {
          arr.push(image); // Keep existing URLs
        } else {
          arr.push(null); // Placeholder for new images
          form.append("pictures", image); // Add new files to FormData
        }
      });
  
      const credentials = btoa(`${user.email}:${user.password}`);
  
      // Upload new images only if there are any
      let files = [];
      if (form.has("pictures")) {
        const imageRes = await axios.post(`${url}/api/upload`, form);
        files = imageRes.data.files;
      }
  
      // Replace placeholders (null) with uploaded file paths
      files.forEach((img) => {
        const emptyIndex = arr.findIndex((d) => d === null);
        if (emptyIndex !== -1) {
          arr[emptyIndex] = img.path; // Replace placeholder
        }
      });
  
      // Ensure `arr` contains exactly 5 items
      if (arr.length !== 5) {
        return alert("Something went wrong with the images.");
      }
  
      // Submit updated data
      await axios.put(
        `${url}/api/quotes/update`,
        {
          address: formData2.address,
          area: formData2.area,
          budget: formData2.budget,
          customerNote: formData2.note,
          image1: arr[0],
          image2: arr[1],
          image3: arr[2],
          image4: arr[3],
          image5: arr[4],
          id: data.id, // Quote ID
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
  
      alert("Quote updated successfully!");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data || "An error occurred.");
      console.error(error.response?.data || error.message);
    } finally {
      hideLoader();
    }
  };
  
  return (
    <div ref={ref} className="w-full flex flex-wrap bg-[#D9D9D9] min-h-[150px]">
      <img
        alt="Property"
        src={img}
        style={{
          height: height,
        }}
        onClick={handleModal3}
        className="w-full max-h-[300px] hover:opacity-35 h-full md:max-w-[200px] md:min-h-full rounded-md object-cover"
      />

      <div className="grid flex-1 grid-cols-2 gap-6 mx-2 my-2 xl:grid-cols-3">
        <div className=" xl:col-span-2">
          <div className="justify-between w-full xl:flex">
            <div>
              <p className="font-medium">{place}</p>
              <p className="font-medium">{budget} TK</p>
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
                  <span className="font-semibold">Offer Price: </span>
                  {data.offerPrice} Tk
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
            <button
              onClick={handleModal2}
              className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md"
            >
              Update Now
            </button>
          ) : data?.ordered && data?.payment_request && !data?.paid ? (
            <button
              onClick={handlePay}
              className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md"
            >
              Pay Now
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
        title={`Update Orders "${place}"`}
        open={isModalOpen2}
        onCancel={handleModal2}
        footer={null}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <form className="w-full p-5 md:p-12" onSubmit={handleUpdate}>
            <div className="justify-between gap-4 mb-5 md:flex-row">
              <div className="w-full">
                <label htmlFor="address" className="block mb-1 font-medium">
                  Property Address
                </label>
                <input
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={formData2.address}
                  onChange={handleChange2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#CAD3FF]"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="area" className="block mb-1 font-medium">
                  Area of the Driveway (sq. feet)
                </label>
                <input
                  id="area"
                  name="area"
                  placeholder="Area"
                  type="number"
                  value={formData2.area}
                  onChange={handleChange2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#CAD3FF]"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="budget" className="block mb-1 font-medium">
                Budget
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                placeholder="Budget"
                value={formData2.budget}
                onChange={handleChange2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#CAD3FF]"
                required
              />
            </div>

            <div className="mb-5">
              <p className="mb-2 font-medium">
                Upload 5 pictures of your driveway in different ways:
              </p>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded-lg md:w-32 md:h-32"
                  >
                    {image ? (
                      <>
                        <img
                          src={
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : url + image
                          }
                          alt={`Uploaded ${index + 1}`}
                          className="object-cover w-full h-full rounded-lg"
                          width={128}
                          height={128}
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute p-1 text-white bg-black rounded-full top-1 right-1"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor={`file-input-${index}`}
                          className="flex flex-col items-center text-gray-500 cursor-pointer"
                        >
                          <FaUpload className="mb-2 text-xl" />
                          <span className="text-sm">Upload</span>
                        </label>
                        <input
                          type="file"
                          id={`file-input-${index}`}
                          className="hidden"
                          onChange={(e) =>
                            e.target.files &&
                            handleFileChange(index, e.target.files[0])
                          }
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="note" className="block mb-1 font-medium">
                Note
              </label>
              <textarea
                required
                id="note"
                name="note"
                placeholder="Write a note"
                value={formData2.note}
                onChange={handleChange2}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#CAD3FF]"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={handleCancel2}
                className="p-2 pl-4 pr-4 text-white bg-red-500 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 pl-4 pr-4 text-white bg-green-500 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
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
