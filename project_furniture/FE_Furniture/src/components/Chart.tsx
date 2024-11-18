import { useContext } from "react";
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
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { OrderContext } from "../store/contexts/OrderContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

dayjs.extend(advancedFormat);

interface Order {
  orderDate: string;
  total: number;
  userId: string;
}

const Chart: React.FC = () => {
  const { orderState } = useContext(OrderContext);

  const orderDataByMonth = orderState.orderCharts.reduce(
    (
      acc: Record<string, { totalPrice: number; totalOrders: number }>,
      order: Order
    ) => {
      const month = dayjs(order.orderDate).format("DD MMM YYYY");
      if (!acc[month]) {
        acc[month] = { totalPrice: 0, totalOrders: 0 };
      }
      acc[month].totalPrice += order.total;
      acc[month].totalOrders += 1;
      return acc;
    },
    {}
  );

  const labels = Object.keys(orderDataByMonth);
  const totalPrices = labels.map((month) => orderDataByMonth[month].totalPrice);
  const totalOrders = labels.map(
    (month) => orderDataByMonth[month].totalOrders
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Price",
        data: totalPrices,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
      },
      {
        label: "Total Orders",
        data: totalOrders,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Order Statistics by Month",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
