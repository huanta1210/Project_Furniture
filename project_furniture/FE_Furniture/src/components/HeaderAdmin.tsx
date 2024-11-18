import { usePageContext } from "../store/contexts/PageContext";
import LogOut from "./LogOut";
import { Order } from "../interfaces/Cart";
import dayjs from "dayjs";
import { useContext } from "react";
import { OrderContext } from "../store/contexts/OrderContext";

const HeaderAdmin = () => {
  const { title, breadcrumbs } = usePageContext();

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
  const totalPrice = totalPrices.reduce((acc, cur) => acc + cur, 0);
  const totalOrders = labels.map(
    (month) => orderDataByMonth[month].totalOrders
  );
  const totalOrder = totalOrders.reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      <section className="flex justify-between">
        <div className="mt-1">
          <p className="text-xs text-slate-500">{breadcrumbs}</p>
          <p className="text-3xl text-slate-800 font-bold mt-2">{title}</p>
        </div>
        <div className="border h-16 w-48 mt-1 flex items-center justify-around bg-white rounded-full">
          <i className="fa-solid fa-question"></i>
          <LogOut />
          <img
            className="w-14 h-14 rounded-full"
            src="https://i.imgur.com/FnTQTnN.jpeg"
            alt=""
          />
        </div>
      </section>
      <section className="mt-2 mb-6">
        <section className="flex flex-wrap gap-4 justify-between">
          <div className="bg-white h-32 flex-grow-0 flex-shrink-0 w-[calc(30%)] rounded-lg">
            <div className="flex items-center">
              <div className="h-16 w-16 text-center ml-2 mt-7 border rounded-full bg-slate-100">
                <i className="fa-solid text-xl p-4 fa-user-group text-indigo-500"></i>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-sm text-slate-600 font-semibold">
                  Number of users ordering by month
                </p>
                <p className="text-black font-semibold text-3xl pt-1">
                  {totalOrder.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="h-32 flex-grow-0 flex-shrink-0 w-[calc(30%)] bg-white rounded-lg">
            <div className="flex items-center">
              <div className="h-16 w-16 text-center ml-2 mt-7 border rounded-full bg-slate-100">
                <i className="fa-solid fa-money-bill text-xl p-4 text-indigo-500"></i>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-sm text-slate-600 font-semibold">
                  Total amount by month
                </p>
                <p className="text-black font-semibold text-3xl pt-1">
                  {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="h-32 flex-grow-0 flex-shrink-0 w-[calc(30%)]  bg-white rounded-lg">
            <div className="flex items-center">
              <div className="h-16 w-16 text-center ml-2 mt-7 border rounded-full bg-slate-100">
                <i className="fa-solid fa-key text-xl p-4 text-indigo-500"></i>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-sm text-slate-600 font-semibold">
                  Current Plan
                </p>
                <p className="text-black font-semibold text-3xl pt-1">
                  Expert+
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default HeaderAdmin;
