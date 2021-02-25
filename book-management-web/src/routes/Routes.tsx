//@ts-ignore
import { BrowserRouter } from "react-router-dom";
import React from "react";
import HomeRoutes from "./HomeRoutes";
import LoginRoutes from "./LoginRoutes";
import RegisterRoutes from './RegisterRoutes';
import CategoryRoutes from './CategoryRoutes';

const Routes = () => {
  return (
    <BrowserRouter>
      <CategoryRoutes/>
      <LoginRoutes />
      <RegisterRoutes />
      <HomeRoutes />
    </BrowserRouter>
  );
};

export default React.memo(Routes);
