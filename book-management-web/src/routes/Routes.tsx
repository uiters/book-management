//@ts-ignore
import { BrowserRouter } from "react-router-dom";
import React from "react";
import HomeRoutes from "./HomeRoutes";
import LoginRoutes from "./LoginRoutes";

const Routes = () => {
  return (
    <BrowserRouter>
      <HomeRoutes />
      <LoginRoutes />
    </BrowserRouter>
  );
};

export default React.memo(Routes);
