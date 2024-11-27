import { useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
const AdminDashboardComponent = ({
    img,
    place,
    budget,
    text,
    feet,
    status,
    updateDate,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const statusColor =
        status === "REJECTED"
            ? "text-red-500"
            : status === "APPROVED"
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


    // From for Accept
    const [formData2, setFormData2] = useState({
        price: "",
        endDate: "",
        startDate: "",
    });

    const handleChange2 = (e) => {
        setFormData2({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit2 = () => {
        console.log("Submitted:", formData2.price);
        setFormData2({
            note: "",
            startDate: "",
            endDate: "",
        });
        setIsModalOpen2(false);
    };




    return (
        <div className="w-full flex flex-wrap bg-[#D9D9D9] cursor-pointer hover:bg-slate-200 min-h-[150px]">
            <img
                alt="Property"
                src={img}
                className="w-full h-full md:max-w-[200px] md:min-h-full rounded-md object-cover"
            />

            <div className="grid xl:grid-cols-3 grid-cols-2 my-2 mx-2 gap-6 flex-1">
                <div className=" xl:col-span-2">
                    <div className="xl:flex w-full justify-between">
                        <div>
                            <p className="font-medium">{place}</p>
                            <p className="font-medium">{budget} $</p>
                        </div>
                        <div className="my-2 xl:my-0">
                            <p className="font-medium">{feet}/feet</p>
                            <p className="font-medium">
                                Status: <span className={`${statusColor}`}>{status}</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className=" text-sm opacity-70">
                            <span className="font-semibold">Address: </span>
                            Dhaka, sadarga
                        </p>
                        <p className=" text-sm opacity-70">
                            <span className="font-semibold">Admin Note: </span>
                            {text}
                        </p>
                    </div>
                </div>

                <div className="xl:col-span-1 flex-1 ">
                    <p className="font-medium">Updated At: {updateDate}</p>
                    {status === "PENDING" ? (
                        <div className="flex flex-wrap gap-3 mt-5">
                            <button
                                onClick={handleModal}
                                className="p-2 pl-4 pr-4 bg-red-500 text-white rounded-md"
                            >
                                Reject
                            </button>
                            <button onClick={handleModal2}
                                className="p-2 pl-4 pr-4 bg-green-500 text-white rounded-md">
                                Accept
                            </button>
                        </div>
                    ) : status === "" ? (
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
                <div className="w-full flex flex-col justify-center items-end">
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
                            className="p-2 pl-4 pr-4 bg-green-500 text-white rounded-md"
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
                <div className="w-full flex flex-col justify-center items-end">
                    <div className="w-full mt-5 mb-5">
                        <label className="block font-medium">Offer Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange2}
                            placeholder="Price"
                            className="mt-2 w-full border border-gray-300 rounded px-3 py-2 outline-none"
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
                                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 outline-none"
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
                                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={handleCancel2}
                            className="p-2 pl-4 pr-4 bg-red-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit2}
                            className="p-2 pl-4 pr-4 bg-green-500 text-white rounded-md"
                        >
                            Accept
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

