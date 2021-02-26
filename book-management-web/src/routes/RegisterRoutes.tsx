//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Register from "../pages/Register/Register";
import { PATHS } from "../constants/paths";
import { ToastContainer } from "react-toastify";

const RegisternRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.REGISTER}>
        <Register></Register>
      </Route>
    </Switch>
  );
};

export default React.memo(RegisternRoutes);