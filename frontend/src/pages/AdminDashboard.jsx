import BarChart from "../components/BarChart";

export default function AdminDashboard() {
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

        <div className=" bg-[#CAD3FF] rounded-lg flex justify-center items-center w-[160px] py-6">
          <p className="font-semibold">20k Revenue</p>
        </div>
      </div>


      <div className="w-full mt-5 md:mt-10 flex justify-center items-center">
        <BarChart/>
      </div>
    </div>
  )
}
