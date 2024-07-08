import logo from "../assets/img/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900">
      <div className="mx-44 py-20 flex justify-between">
        <div className="footer-brand">
          <div>
            <img className="w-16 h-16 inline-block" src={logo} alt="" />
            <span className="inline-block font-bold text-2xl text-white">
              Furniro
            </span>
            <p className="text-white">
              400 University Drive Suite 200 Coral <p>Gables,</p>
            </p>
            <p className="text-white">Fl 33134 USA</p>
          </div>
        </div>

        <div className="footer-site-map mt-2">
          <h3 className="text-white text-xl mb-4 font-semibold">Sitemap</h3>
          <ul>
            <li className="pb-3">
              <a className="text-white" href="">
                Home
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                Shop
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                About
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-help mt-2">
          <h3 className="text-white text-xl mb-4 font-semibold">Help</h3>
          <ul>
            <li className="pb-3">
              <a className="text-white" href="">
                Payments Option
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                Returns
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-location mt-2">
          <h3 className="text-white text-xl mb-4 font-semibold">Location</h3>
          <ul>
            <li className="pb-3">
              <a className="text-white" href="">
                support@euphoria
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                Ahmedabad
              </a>
            </li>
            <li className="pb-3">
              <a className="text-white" href="">
                Udaipur, India-313002
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="line mx-44 border-t border-gray-50">
        <p className="text-white text-center py-6">
          Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
