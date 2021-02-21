//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login/Login";

const LoginRoutes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login></Login>
      </Route>
    </Switch>
  );
};

export default React.memo(LoginRoutes);
