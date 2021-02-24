//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login/Login";
import { PATHS } from "../constants/paths";

const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.LOGIN}>
        <Login></Login>
      </Route>
    </Switch>
  );
};

export default React.memo(LoginRoutes);
