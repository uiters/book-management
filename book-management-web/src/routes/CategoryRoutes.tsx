//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Category from "../pages/Category/Category";
import { PATHS } from "../constants/paths";
// import {NewCategoryRoutes} from './sub-routes/NewCategoryRoutes';

const CategoryRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.CATEGORY}>
        <Category></Category>
        {/* <NewCategoryRoutes></NewCategoryRoutes> */}
      </Route>
    </Switch>
  );
};

export default React.memo(CategoryRoutes);
