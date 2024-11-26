"use client";

import { useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

const NewQuotes = () => {
  const [formData, setFormData] = useState({
    address: "",
    area: "",
    budget: "",
    note: "",
  });

  const [images, setImages] = useState(Array(5).fill(null));

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any submission logic here
    console.log("Form Data:", formData);
    console.log("Uploaded Images:", images);

    setFormData({
      address: "",
      area: "",
      budget: "",
      note: "",
    });
    setImages(Array(5).fill(null));

    alert("Form submitted successfully!");
  };

  return (
    <div className=" flex flex-col justify-start items-center">
      <p className="text-xl md:text-2xl font-semibold md:mt-5">New Quotes</p>
        <form className="w-full p-5 md:p-12" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
            <div className="w-full">
              <label htmlFor="address" className="block font-medium mb-1">
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
              <label htmlFor="area" className="block font-medium mb-1">
                Area of the Driveway (sq. feet)
              </label>
              <input
                id="area"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#CAD3FF]"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="budget" className="block font-medium mb-1">
              Budget
            </label>
            <input
              id="budget"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#CAD3FF]"
              required
            />
          </div>

          <div className="mb-5">
            <p className="font-medium mb-2">
              Upload 5 pictures of your driveway in different ways:
            </p>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 border-2 border-gray-300 rounded-lg bg-gray-100"
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
                        className="absolute top-1 right-1 text-white bg-black p-1 rounded-full"
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
                        <FaUpload className="text-xl mb-2" />
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
            <label htmlFor="note" className="block font-medium mb-1">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              placeholder="Write a note (optional)"
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
