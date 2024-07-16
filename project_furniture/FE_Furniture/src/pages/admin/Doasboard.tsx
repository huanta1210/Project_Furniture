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
import SideBar from "./component/SideBar";
import HeaderAdmin from "./component/HeaderAdmin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Doasboard = () => {
  return (
    <div className="bg-slate-50">
      <MainDashboard />
    </div>
  );
};

const MainDashboard = () => {
  return (
    <>
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />
        <Content />
      </section>
    </>
  );
};

const Content = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Users",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: "rgba(99, 102, 241, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Statistics by Month",
      },
    },
  };
  return (
    <>
      <section className="col-span-9 mx-5">
        <HeaderAdmin />

        <section className="bg-white mt-5 rouded-lg">
          <div className="flex items-center">
            <div className="h-16 w-16 text-center ml-2 mt-7 border rounded-full bg-slate-100">
              <i className="fa-solid text-xl p-4 fa-user-group text-indigo-500"></i>
            </div>
            <div className="ml-3 mt-3">
              <p className="text-sm text-slate-600 font-semibold">
                Statistics by year
              </p>
              <p className="text-black font-semibold text-3xl pt-1">131,4</p>
            </div>
          </div>
          <Bar data={data} options={options} />
        </section>
      </section>
    </>
  );
};

export default Doasboard;
