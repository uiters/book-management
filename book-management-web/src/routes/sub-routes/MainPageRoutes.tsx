//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import MainPage from "../../pages/Home/pages/MainPage";
import { PATHS } from "../../constants/paths";

const MainPageRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.MAIN}>
        <MainPage></MainPage>
      </Route>
    </Switch>
  );
};

export default MainPageRoutes;
