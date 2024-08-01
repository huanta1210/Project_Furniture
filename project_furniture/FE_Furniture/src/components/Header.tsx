import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

function Header() {
  return (
    <header className="mx-44">
      <div className="header flex justify-between items-center">
        <div className="header-logo">
          <img className="w-16 h-16 inline-block" src={logo} alt="" />
          <span className="inline-block font-bold text-2xl">Furniro</span>
        </div>

        <div className="header-nav m-auto">
          <ul>
            <li className="inline-block">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="inline-block pl-9">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="/products"
              >
                Shop
              </Link>
            </li>
            <li className="inline-block pl-9">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="inline-block pl-9">
              <Link
                className="text-lg font-semibold hover:text-lime-600"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="header-information ">
          <ul className="mt-4">
            <li className="inline-block">
              <Link className="hover:text-lime-500" to="/login">
                <i className="ti ti-user">
                  <span className="text-sm pl-1">Tài khoản</span>
                </i>
              </Link>
            </li>
            <li className="inline-block pl-5 text-lg">
              <Link className="hover:text-lime-500" to="">
                <i className="ti ti-search"></i>
              </Link>
            </li>
            <li className="inline-block pl-5 text-lg">
              <Link className="hover:text-lime-500" to="">
                <i className="ti ti-heart"></i>
              </Link>
            </li>
            <li className="inline-block pl-5 text-lg">
              <div className="cart relative">
                <Link to="/cart" className="hover:text-lime-500">
                  <i className="ti ti-shopping-cart"></i>
                </Link>
                <div className="absolute top-0 left-3 right-0 bg-red-500 text-white rounded-full size-4 flex items-center justify-center text-xs">
                  0
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
