import PropTypes from "prop-types";
import Img1 from "../Data/Img/img-1.png";
import Img2 from "../Data/Img/img-2.jpeg";



const Orders = () => {
  return <div className="w-[80] ml-[10%] h-screen flex flex-col justify-start items-center">
    <p className="text-2xl font-semibold mt-5">Orders Page</p>

    <div className="w-[90%] ml-[9%] mt-5 flex flex-col justify-start items-start">
      <div className="w-full mt-5">
        <OrdersComponent
          img={Img1}
          place="Gulshan Niketon 1/2"
          budget="13500"
          text="We will not agree on this budget. Please increase..."
          feet="1500sq"
          status="UNPAID"
          updateDate="15 July 2020"
        />
        <OrdersComponent
          img={Img2}
          place="Kajipara, Mirpur"
          budget="8500"
          text="We will not agree on this budget. Please increase..."
          feet="1200sq"
          status="UNPAID"
          updateDate="22 Nov 2020"
        />
      </div>
    </div>
  </div>;
};



const OrdersComponent = ({ img, place, budget, text, feet, status, updateDate }) => {
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
              <p className="font-medium">{budget} $</p>
            </div>
            <div>
              <p className="font-medium">{feet}/feet</p>
              <p className="font-medium">
                Status: <span className="text-[#E21E1E]">{status}</span>
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm opacity-70">{text}</p>
          <button className="text-blue-500 underline">More</button>
        </div>

        <div className="mt-3 mr-3 flex flex-col items-center">
          <p className="font-medium">Updated At: {updateDate}</p>
          <button className="mt-5 p-2 pl-4 pr-4 bg-[#CAD3FF] rounded-md">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

OrdersComponent.propTypes = {
  img: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  feet: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
};

export default Orders;
