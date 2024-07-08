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
              <a className="text-lg font-semibold hover:text-lime-600" href="/">
                Home
              </a>
            </li>
            <li className="inline-block pl-9">
              <a
                className="text-lg font-semibold hover:text-lime-600"
                href="/product"
              >
                Shop
              </a>
            </li>
            <li className="inline-block pl-9">
              <a
                className="text-lg font-semibold hover:text-lime-600"
                href="/contact"
              >
                Contact
              </a>
            </li>
            <li className="inline-block pl-9">
              <a
                className="text-lg font-semibold hover:text-lime-600"
                href="/about"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        <div className="header-information ">
          <ul className="mt-4">
            <li className="inline-block">
              <a className="hover:text-lime-500" href="/login">
                <i className="ti ti-user">
                  <span className="text-sm pl-1">Tài khoản</span>
                </i>
              </a>
            </li>
            <li className="inline-block pl-5 text-lg">
              <a className="hover:text-lime-500" href="">
                <i className="ti ti-search"></i>
              </a>
            </li>
            <li className="inline-block pl-5 text-lg">
              <a className="hover:text-lime-500" href="">
                <i className="ti ti-heart"></i>
              </a>
            </li>
            <li className="inline-block pl-5 text-lg">
              <a className="hover:text-lime-500" href="/cart">
                <i className="ti ti-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
