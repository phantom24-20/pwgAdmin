import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const SalesChart = () => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "In Stock",
        data: [2000, 3000, 2500, 4000, 4200, 3900, 4700],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Out of Stock",
        data: [1200, 2100, 1500, 2300, 3200, 2900, 3700],
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Line data={data} options={options} />
    </ChartContainer>
  );
};

export default SalesChart;
