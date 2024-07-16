import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import { useState } from "react";
import { User } from "../../../interfaces/User";

const SideBar = () => {
  const getToken = (): User => {
    const data = localStorage.getItem("user");

    return data ? JSON.parse(data) : null;
  };

  const { userName } = getToken();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const menuItems = [
    {
      label: "Main Dashboard",
      icon: "fa-solid fa-house-chimney-user",
      path: "/admin/dashboard",
    },
    {
      label: "Product Management",
      icon: "fa-brands fa-product-hunt",
      path: "/admin/products",
    },
    {
      label: "Category Management",
      icon: "fa-solid fa-layer-group",
      path: "/admin/categories",
    },
    {
      label: "Order Management",
      icon: "fa-solid fa-cart-flatbed",
      path: "/admin/orders",
    },
    {
      label: "Manage Comments",
      icon: "fa-solid fa-comments",
      path: "/admin/comments",
    },
    {
      label: "Users List",
      icon: "fa-solid fa-rectangle-list",
      path: "/admin/users",
    },
    {
      label: "Profile Settings",
      icon: "fa-solid fa-gears",
      path: "/admin/profile",
    },
  ];
  return (
    <>
      <section className="col-span-3 ">
        <section className="pl-8 bg-white ">
          <div className="header-logo border-b-2 flex items-center">
            <img className="w-16 h-16 " src={logo} alt="" />
            <span className=" font-bold text-2xl">Furniro</span>
          </div>

          <div className="my-5 pl-2">
            <ul className="side-bar">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`pb-1 w-9/12 my-1 text-base font-semibold text-slate-600 dashboard ${
                    activeIndex === index ? "li-active" : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  <Link to={item.path}>
                    <i
                      className={`text-lg pr-4 p-2 text-slate-800 text-indigo-500 ${item.icon}`}
                    ></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mt-20">
            <img
              className="w-20 h-20 rounded-full"
              src="https://i.imgur.com/FnTQTnN.jpeg"
              alt=""
            />
            <p className="text-lg pr-4 p-2 text-slate-700 font-semibold px-10 ">
              {userName}
            </p>
            <button
              type="button"
              className="border px-1 h-10 w-10 rounded-full p-auto "
            >
              <i className="p-px text-xl fa-solid text-slate-700 fa-arrow-right-from-bracket text-indigo-500"></i>
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default SideBar;
