//@ts-ignore
import { BrowserRouter } from "react-router-dom";
import React from "react";
import HomeRoutes from "./HomeRoutes";
import LoginRoutes from "./LoginRoutes";
import RegisterRoutes from './RegisterRoutes';
import Header from "../components/Header";

const Routes = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <LoginRoutes />
      <RegisterRoutes />
      <HomeRoutes />
    </BrowserRouter>
  );
};

export default React.memo(Routes);
