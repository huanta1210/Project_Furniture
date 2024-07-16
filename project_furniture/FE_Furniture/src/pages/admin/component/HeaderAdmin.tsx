const HeaderAdmin = () => {
  return (
    <>
      <section className="flex justify-between">
        <div className="mt-1">
          <p className="text-xs text-slate-500">Pages / Main Dashboard</p>
          <p className="text-3xl text-slate-800 font-bold mt-2">
            Main Dashboard
          </p>
        </div>
        <div className="border h-16 w-36 mt-1 flex items-center justify-around bg-white rounded-full">
          <i className="fa-solid fa-question"></i>
          <button type="button">
            <i className="p-px text-xl fa-solid text-slate-700 fa-arrow-right-from-bracket"></i>
          </button>
          <img
            className="w-14 h-14 rounded-full"
            src="https://i.imgur.com/FnTQTnN.jpeg"
            alt=""
          />
        </div>
      </section>
      <section className="mt-2 mb-6">
        <section className="flex flex-wrap gap-4 justify-between">
          <div className="bg-white  h-32 w-80 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)] rounded-lg">
            <div className="flex items-center">
              <div className="h-16 w-16 text-center ml-2 mt-7 border rounded-full bg-slate-100">
                <i className="fa-solid text-xl p-4 fa-user-group text-indigo-500"></i>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-sm text-slate-600 font-semibold">
                  Number of users ordering by month
                </p>
                <p className="text-black font-semibold text-3xl pt-1">
                  500,000
                </p>
              </div>
            </div>
          </div>

          <div className=" h-32 w-80 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)] bg-white rounded-lg">
            <div className="flex items-center">
              <div className="h-16 w-16 text-center ml-2 mt-7 border rounded-full bg-slate-100">
                <i className="fa-solid fa-money-bill text-xl p-4 text-indigo-500"></i>
              </div>
              <div className="ml-3 mt-3">
                <p className="text-sm text-slate-600 font-semibold">
                  Total amount by month
                </p>
                <p className="text-black font-semibold text-3xl pt-1">
                  174,540
                </p>
              </div>
            </div>
          </div>
          <div className=" h-32 w-80 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]  bg-white rounded-lg">
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
