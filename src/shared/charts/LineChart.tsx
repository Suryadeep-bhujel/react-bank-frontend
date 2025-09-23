// LineChartClass.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
type Props = {
  labels: any,
  data: any[],
  options: any[],

}
const LineChart: React.FC<Props> = ({ data, labels, options }) => {
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  data = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: [1200, 1900, 1700, 2200, 2100, 2600],
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 4,
      },
    ],
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Revenue — First half of year" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      y: { beginAtZero: false, ticks: { callback: (v) => `$${v}` } },
    },
  };
  return (
    <>
      <div style={{ width: "100%", height: 400 }}>
        <Line data={data} options={options} />
      </div>
    </>
  )
}
export default LineChart
