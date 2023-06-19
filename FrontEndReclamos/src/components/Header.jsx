import logo from "../img/shohin.svg";

const Header = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex md:flex-row flex-wrap items-center justify-center mx-auto p-4 ">
          <a href="#" className="flex items-center mb-6">
            <img
              className="mx-auto h-17 w-auto "
              src={logo}
              alt="Logo Shohin"
            />
          </a>
          <div className="flex items-center md:order-2 ">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            ></button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
