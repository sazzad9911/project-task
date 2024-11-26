"use client";

import DashboardComponent from "../components/DashboardComponent";
import Img1 from "../Data/Img/img-1.png";
import Img2 from "../Data/Img/img-2.jpeg";

const Dashboard = () => {
  return (
    <div className=" mx-4 my-5">
      <p className="text-xl md:text-2xl font-semibold md:mt-5 text-center">My Dashboard</p>

      <div className="my-4 flex justify-center flex-wrap gap-5">
        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">22 Orders</p>
        </div>
        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">22 Payments</p>
        </div>
      </div>

      <div className=" flex flex-col justify-start items-start ">
        <p className="font-semibold">Recent Quotes</p>
        <div className=" mt-5 gap-5 flex flex-col w-full">
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
            text="We will not agree on this budget. Please increasesfgfsdg dsgsdf dsgsdfg dsgdsg dsfgdsfg dsfgds sdgds dsfgsd ds dsfds sdgds dsgds d dfgds sdgfds dsgds sd"
            feet="1500sq"
            status="PENDING"
            updateDate="15 July 2020"
          />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
