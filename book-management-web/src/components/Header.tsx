//@ts-ignore
import { Link } from "react-router-dom";
import { PATHS } from "../constants/paths";
import User from "../types/models/UserModel";

const Header = () => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const logOut = () => {
    console.log("log out trigger");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="header w-full items-center text-center bg-indigo-300 fixed top-0 mb-6 z-20">
      <div className="container flex gap-x-7 w-11/12 items-center mx-auto py-2">
        <div className="name w-32">
          <Link to={"/"} className="font-bold text-2xl">
            Booksy
          </Link>
        </div>
        <div className="search_bar flex-grow max-w-xl flex bg-gray-200 rounded-lg px-6 py-2 mx-auto">
          <input
            type="text"
            name=""
            id=""
            className="w-full outline-none bg-transparent text-lg font-bold"
            placeholder="Search by author, title, name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 self-center"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="buttons flex gap-x-4 items-center justify-center">
          {token !== null && (
            <div className="flex space-x-3 items-center">
              <div className="cartIcon">
                {/* <span
                  className="rounded-full px-2 align-top bg-gray-400 -ml-2 text-md"
                  id="lblCartCount"
                >
                  {" "}
                  5{" "}
                </span> */}
                <a href={PATHS.CART}>
                  <img
                    className="w-6 h-6"
                    src="https://www.flaticon.com/svg/vstatic/svg/590/590509.svg?token=exp=1614738035~hmac=22ad4b86bf6aed327d508b71060c5d90"
                    alt=""
                  />
                </a>
              </div>

              <p className="font-bold">{"" || user?.name}</p>
              <div className="dropdown group relative inline-block hover:block">
                <button className="rounded-full w-8 h-8 bg-blue-900">
                  <a>{"" || user.name?.charAt(0).toUpperCase()}</a>
                </button>
                <div className="dropdown-content group-hover:block hidden group-hover:bg-gray-400 group-hover:text-red-500 absolute z-50"></div>
              </div>
              <button
                className=" font-bold focus:outline-none"
                onClick={logOut}
              >
                Log Out
              </button>
            </div>
          )}

          {(token === null || token === "") && (
            <div className="space-x-2">
              <Link to={"/login"} className="font-bold">
                Login
              </Link>
              <Link to={"/register"} className="font-bold">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
