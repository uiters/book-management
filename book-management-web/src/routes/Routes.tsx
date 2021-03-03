//@ts-ignore
import { BrowserRouter } from "react-router-dom";
import React from "react";
import HomeRoutes from "./HomeRoutes";
import LoginRoutes from "./LoginRoutes";
import RegisterRoutes from "./RegisterRoutes";
import CategoryRoutes from "./CategoryRoutes";
import Header from "../components/Header";
import AuthorRoutes from "./AuthorRoutes";
import PublisherRoutes from './PublisherRoutes';
import Tabs from "../pages/Home/components/Tabs";

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
