//@ts-ignore
import React from "react";
import Header from "../../components/Header";
import Banner from "./components/Banner";
import Tabs from "./components/Tabs";

const Home = () => {
  return (
    <div className="App flex justify-center h-60 w-full rounded-xl">
      <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
        <Header />
        <div className="body h-40 mt-8">
          <Tabs></Tabs>
          <Banner></Banner>
        </div>
      </div>
    </div>
  );
};

export default Home;
