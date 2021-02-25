//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import NewCategory from "../../pages/Category/pages/NewCategory";

const NewCategoryRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.NEWCATEGORY}>
        <NewCategory></NewCategory>
      </Route>
    </Switch>
  );
};

export default NewCategoryRoutes;
