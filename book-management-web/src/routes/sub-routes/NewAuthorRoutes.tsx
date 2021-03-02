//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import NewAuthorPage from "../../pages/Author/pages/NewAuthorPage";

const NewAuthorRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.NEWAUTHOR}>
        <NewAuthorPage></NewAuthorPage>
      </Route>
    </Switch>
  );
};

export default NewAuthorRoutes;
