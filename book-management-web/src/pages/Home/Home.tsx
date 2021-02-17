import React from "react";
import Book from "./components/Book";
import banner from "../../assets/banner.svg";
import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/b2.jpg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpg";
import b5 from "../../assets/b5.jpg";
import b6 from "../../assets/b6.jpg";

const Home = () => {
  return (
    <div className="App flex justify-center h-60 w-full rounded-xl p-8">
      <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
        <div className="header flex gap-x-7 h-12 w-full">
          <div className="name w-32">
            <p className="font-bold text-2xl ">Booksy</p>
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
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <button className="rounded-full w-8 h-8 bg-blue-900">T</button>
            <p className="font-bold">EN</p>
          </div>
        </div>
        <div className="body h-40 mt-8">
          <div className="tabs flex gap-x-8 justify-center">
            <a href="/Home" className="font-bold text-lg text-blue-900">
              Home
            </a>
            <a href="/bestseller" className="font-bold text-lg text-gray-500">
              Bestseller
            </a>
            <a href="/Category" className="font-bold text-lg text-gray-500">
              Category
            </a>
            <a href="/Store" className="font-bold text-lg text-gray-500">
              Find a store
            </a>
            <a href="/Blog" className="font-bold text-lg text-gray-500">
              Blog
            </a>
          </div>
          <div className="banner mt-12 flex rounded-2xl bg-yellow-100 px-10">
            <div className="banner-texts space-y-4 flex flex-col flex-grow items-start justify-center">
              <p className="text-5xl font-bold text-blue-800">
                Build your library
              </p>
              <p className="text-lg font-bold text-gray-400">
                Buy two selected books and get one free
              </p>
              <button className="font-bold text-lg px-6 py-2 bg-yellow-300 text-white rounded-xl focus:outline-none">
                View all
              </button>
            </div>
            <img src={banner} alt="Banner" className="w-5/12 pr-8" />
          </div>
          <div className="popular-section mt-12 flex">
            <div className="popular flex items-start">
              <p className="font-bold text-2xl">Popular Now</p>
            </div>
            <div className="view-all-btn flex-grow flex justify-end">
              <button className="font-bold text-lg text-gray-300 focus:outline-none">
                View all
              </button>
            </div>
          </div>

          <div className="popular-list mt-12 flex">
            <Book
              imageSrc={b1}
              author="John Gray"
              title="Đàn ông sao hỏa đàn bà sao kim"
            ></Book>
            <Book
              imageSrc={b2}
              author="Minh Niệm"
              title="Hiểu về trái tim"
            ></Book>
            <Book
              imageSrc={b3}
              author="John Gray"
              title="Tôi quyết định sống cho chính tôi"
            ></Book>
            <Book imageSrc={b4} author="Diệp Tu" title="Tư duy sâu"></Book>
            <Book
              imageSrc={b5}
              author="Bill Burnett"
              title="Thiết kế một cuộc đời đáng sống"
            ></Book>
            <Book
              imageSrc={b6}
              author="Cảnh Thiên"
              title="Đừng lựa chọn an nhàn khi còn trẻ"
            ></Book>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
