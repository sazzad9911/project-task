import PropTypes from "prop-types";
import Img1 from "../Data/Img/img-1.png";
import Img2 from "../Data/Img/img-2.jpeg";


const Payments = () => {
  return <div className="w-[80] ml-[10%] h-screen flex flex-col justify-start items-center">
    <p className="text-2xl font-semibold mt-5">My Payments</p>

    <div className="w-[90%] ml-[9%] mt-5 flex flex-col justify-start items-start">
      <div className="w-full mt-5">
        <PaymentsComponent
          img={Img1}
          place="Gulshan Niketon 1/2"
          budget="13500"
          text="We will not agree on this budget. Please increase..."
          feet="1500sq"
          status="PAID"
          updateDate="15 July 2020"
        />
        <PaymentsComponent
          img={Img2}
          place="Kajipara, Mirpur"
          budget="8500"
          text="We will not agree on this budget. Please increase..."
          feet="1200sq"
          status="PAID"
          updateDate="22 Nov 2020"
        />
      </div>
    </div>
  </div>;
};

const PaymentsComponent = ({ img, place, budget, text, feet, status, updateDate }) => {
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
                Status: <span className="text-[#07C236]">{status}</span>
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm opacity-70">{text}</p>
          <button className="text-blue-500 underline">More</button>
        </div>

        <div className="mt-3 mr-3 flex flex-col items-center">
          <p className="font-medium">Updated At: {updateDate}</p>
          
        </div>
      </div>
    </div>
  );
};

PaymentsComponent.propTypes = {
  img: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  feet: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
};

export default Payments;
