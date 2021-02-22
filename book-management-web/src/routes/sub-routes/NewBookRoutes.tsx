//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import NewBookPage from "../../pages/Home/pages/NewBookPage";

const NewBookRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.NEWBOOK}>
        <NewBookPage></NewBookPage>
      </Route>
    </Switch>
  );
};

export default NewBookRoutes;
