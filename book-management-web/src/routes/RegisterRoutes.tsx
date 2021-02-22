//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Register from "../pages/Register/Register";

const RegisternRoutes = () => {
  return (
    <Switch>
      <Route exact path="/register">
        <Register></Register>
      </Route>
    </Switch>
  );
};

export default React.memo(RegisternRoutes);