import AdminDashboardComponent from "../components/AdminDashboardComponent";
import Img1 from "../Data/Img/img-1.png";

export default function AdminOrders() {
  return (
    <div className=" mx-4 my-5">
      <p className="text-xl md:text-2xl font-semibold md:mt-5 text-center">My Orders</p>

      <div className=" flex flex-col justify-start items-start ">
        <div className=" mt-5 gap-5 flex flex-col w-full">
          <AdminDashboardComponent
            img={Img1}
            place="Gulshan Niketon 1/2"
            budget="13500"
            text="We will not agree on this budget. Please increase..."
            feet="1500sq"
            status="UNPAID"
            updateDate="15 July 2020"
          />
          <AdminDashboardComponent
            img={Img1}
            place="Kajipara, Mirpur"
            budget="8500"
            text="We will not agree on this budget. Please increase..."
            feet="1200sq"
            status="UNPAID"
            updateDate="22 Nov 2020"
          />

        </div>
      </div>

    </div>
  )
}
