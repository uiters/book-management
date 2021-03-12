//@ts-ignore
import { Link } from "react-router-dom";
import { PATHS } from "../constants/paths";
import User from "../types/models/UserModel";
//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import React, { useState, useEffect, useCallback, Fragment } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import bookApi from "../services/api/bookApi";
import BookModel from "../types/models/BookModel";
import { toastError } from "../services/toastService";
import  searchSrc  from "../assets/loupe.png";
import cartIcon from "../assets/shopping-cart.png";

const Header = () => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
 
  const history = useHistory();

  const [data, setData] = useState<BookModel[]>([]);
  const [searchTitle, setSearchTitle] = useState("");

  const logOut = () => {
    console.log("log out trigger");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    history.push(PATHS.MAIN)
  };

  const handleChangeInput = (e : any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      // Do something
      OnSearchFunc()
    }
    else
    {
      setSearchTitle(e.target.value)
    }
  }
  

  const handeEnterPress = (e : any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      // Do something
      OnSearchFunc()
    }
    else
    {
      setSearchTitle(e.target.value)
    }
  }

  const OnSearchFunc = () => {
    history.push(PATHS.BOOK_SEARCH + "?searchTitle=" + searchTitle)
  }

  // useEffect(() => {
  //   OnSearchFunc();
  // }, [searchTitle]);

   

  return (
    <div className="header w-full items-center text-center bg-indigo-300 fixed top-0 mb-6 z-20">
      <div className="container flex gap-x-7 w-11/12 items-center mx-auto py-2">
        <div className="name w-32">
          <Link to={PATHS.MAIN} className="font-bold text-2xl">
            Booksy
          </Link>
        </div>
        
          {/* <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((dt: any) => dt.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
                onChange = {handleTextFieldChange}
              />
            )}
          /> */}
          <div className="flex rounded-xl w-3/5 bg-white mx-auto">
            <input
              type="text"
              placeholder="Searh Book by Title, Category, Author..."
              defaultValue=""
              className="w-10/12 p-2 outline-none flex-grow rounded-xl pl-5"
              onChange={handleChangeInput}
              onKeyUp= {handeEnterPress}
              />
            <button onClick={OnSearchFunc} className="bg-white items-right rounded-xl pr-3 outline-none">
              <img className="outline-none" src={searchSrc} alt="" />
            </button>
          </div>

        <div className="buttons flex gap-x-4 items-center justify-center">
          {token !== null && (
            <div className="flex space-x-3 items-center">
              <div className="cartIcon">
                <a href={PATHS.CART}>
                  <img
                    className="w-8 h-8"
                    src={cartIcon}
                    alt=""
                  />
                </a>
              </div>

              <div className="dropdown group relative inline-block focus:block">
                <div className="flex gap-x-2 items-center">
                  <button className="rounded-full w-8 h-8 bg-blue-900 focus: outline-none">
                    <a>{"" || user.name?.charAt(0).toUpperCase()}</a>
                  </button>
                  <p className="font-bold">{"" || user?.name}</p>
                </div>

                <div className="group-hover:block hidden group-hover:text-blue-500 right-0 shadow-sm group-hover:bg-white absolute z-50">
                  <button className="focus:outline-none no-underline block border-b-2 w-full px-4 py-2">
                    <a href={PATHS.ORDER}>Order List</a>
                  </button>
                  <button className="focus:outline-none no-underline block border-b-2 w-full px-4 py-2" onClick={logOut}>
                    Log Out
                  </button>
                </div>
              </div>
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
