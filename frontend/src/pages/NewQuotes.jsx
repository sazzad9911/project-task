import { useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useLoader } from "../providers/LoadingProvider";
import axios from "axios";
import url from "../variables/url";

const NewQuotes = () => {
  const [formData, setFormData] = useState({
    address: "",
    area: "",
    budget: "",
    note: "",
  });

  const [images, setImages] = useState(Array(5).fill(null));
  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 5) {
      return alert("Upload all images");
    }
    showLoader();
    try {
      const form = new FormData();
      images.forEach((image) => {
        form.append(`pictures`, image);
      });
      const credentials = btoa(`${user.email}:${user.password}`);
      const imageRes = await axios.post(`${url}/api/upload`, form);
      const files = imageRes.data.files;
      await axios.post(
        `${url}/api/quotes/create`,
        {
          address: formData.address,
          area: formData.area,
          budget: formData.budget,
          customerNote: formData.note,
          image1: files[0].path,
          image2: files[1].path,
          image3: files[2].path,
          image4: files[3].path,
          image5: files[4].path,
        },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      alert("Quotes submitted!");
      window.location.href="/"
    } catch (error) {
      alert(error.response.data);
      console.log(error)
    } finally {
      hideLoader();
    }

  };

  return (
    <div className="flex flex-col items-center justify-start ">
      <p className="text-xl font-semibold md:text-2xl md:mt-5">New Quotes</p>
      <form className="w-full p-5 md:p-12" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 mb-5 md:flex-row">
          <div className="w-full">
            <label htmlFor="address" className="block mb-1 font-medium">
              Property Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
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
              value={formData.area}
              onChange={handleChange}
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
            value={formData.budget}
            onChange={handleChange}
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
                      src={URL.createObjectURL(image)}
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
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#CAD3FF]"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#CAD3FF] py-2 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewQuotes;
