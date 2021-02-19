//@ts-ignore
import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import Banner from "./components/Banner";
import ListBook from "./components/ListBook";
import bookApi from "../../services/api/bookApi";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  
  useEffect(async () => {
    const result = await bookApi.getAllBooks();
    console.log(result);
    
    setData(result);
  })

  return (
    <div className="App flex justify-center h-60 w-full rounded-xl p-8">
      <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
        <Header />
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
          <Banner></Banner>

          <ListBook title={'Popular Now'}></ListBook>
          <ListBook title={'Văn học'}></ListBook>
          <ListBook title={'Kinh tế'}></ListBook>
          <ListBook title={'Kĩ năng sống'}></ListBook>
        </div>
      </div>
    </div>
  );
};

export default Home;
