import SideBar from "../../components/SideBar";
import HeaderAdmin from "../../components/HeaderAdmin";
import Chart from "../../components/Chart";

const Doasboard = () => {
  return (
    <div className="bg-slate-50">
      <section className="grid grid-cols-12 gap-4 mt-10">
        <SideBar />
        <Content />
      </section>
    </div>
  );
};

const Content = () => {
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
          <Chart />
        </section>
      </section>
    </>
  );
};

export default Doasboard;
