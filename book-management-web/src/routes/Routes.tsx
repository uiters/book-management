//@ts-ignore
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import HomeRoutes from "./HomeRoutes";
import LoginRoutes from "./LoginRoutes";
import RegisterRoutes from './RegisterRoutes';

const Routes = () => {
  return (
    <BrowserRouter>
      <HomeRoutes />
      <LoginRoutes />
      <RegisterRoutes />
    </BrowserRouter>
  );
};

export default React.memo(Routes);
