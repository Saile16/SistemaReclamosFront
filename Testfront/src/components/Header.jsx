import { Link } from "react-router-dom";
import logo from "../img/shohin.svg";

const Header = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex md:flex-row flex-wrap items-center justify-center mx-auto p-4 ">
          <Link to="/reclamos" className="flex items-center mb-6">
            <img
              className="mx-auto h-17 w-auto "
              src={logo}
              alt="Logo Shohin"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
