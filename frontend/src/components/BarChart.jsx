import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ monthly }) => {
  // Chart data
 
  const data = {
    labels:  monthly.reduce((total, item) => { total.push(item.month); return total;}, []),
    datasets: [
      {
        label: "Revenue",
        data: monthly.reduce((total, item) => { total.push(item.revenue); return total;}, []),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue",
      },
    },
  };

  return (
    <div className="w-full md:w-full md:h-[500px] mx-auto">
  
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
