//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home/Home";

const HomeRoutes = () => {
  return (
    <Switch>
      <Route path="/">
        <Home></Home>
      </Route>
    </Switch>
  );
};

export default React.memo(HomeRoutes);
