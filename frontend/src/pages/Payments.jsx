import PropTypes from "prop-types";
import Img1 from "../Data/Img/img-1.png";
import Img2 from "../Data/Img/img-2.jpeg";
import DashboardComponent from "../components/DashboardComponent";


const Payments = () => {
  return <div className="mx-4 my-5 flex flex-col justify-start items-center">
    <p className="text-xl md:text-2xl font-semibold md:mt-5">My Payments</p>

    
      <div className="mt-5 gap-5 flex flex-col w-full">
        <DashboardComponent
          img={Img1}
          place="Gulshan Niketon 1/2"
          budget="13500"
          text="We will not agree on this budget. Please increase..."
          feet="1500sq"
          status="PAID"
          updateDate="15 July 2020"
        />
        <DashboardComponent
          img={Img2}
          place="Kajipara, Mirpur"
          budget="8500"
          text="We will not agree on this budget. Please increase..."
          feet="1200sq"
          status="PAID"
          updateDate="22 Nov 2020"
        />
      </div>
    
  </div>;
};

export default Payments;
