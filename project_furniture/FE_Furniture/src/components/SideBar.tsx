import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useContext, useEffect, useState } from "react";
import LogOut from "./LogOut";
import { usePageContext } from "../store/contexts/PageContext";
import { AuthContext } from "../store/contexts/AuthContext";

const SideBar = () => {
  const { userState } = useContext(AuthContext);
  console.log(userState.users?.userName);

  const { setTitle, setBreadcrumbs } = usePageContext();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  const handleClick = (index: number, label: string) => {
    setActiveIndex(index);
    setTitle(label);
    setBreadcrumbs(`Pages / ${label}`);
  };

  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(currentIndex);
  }, [location.pathname]);

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
                  onClick={() => handleClick(index, item.label)}
                >
                  <Link to={item.path}>
                    <i
                      className={`text-lg pr-4 p-2 text-indigo-800 text-indigo-500 ${item.icon}`}
                    ></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mt-20">
            <img
              className="size-12 rounded-full"
              src="https://i.imgur.com/FnTQTnN.jpeg"
              alt=""
            />
            <p className="text-sm pr-4 p-2 text-slate-700 font-semibold px-4 ">
              {userState.users?.userName}
            </p>
            <LogOut />
          </div>
        </section>
      </section>
    </>
  );
};

export default SideBar;
