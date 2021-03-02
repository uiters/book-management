//@ts-ignore
import { Switch, Route } from "react-router-dom";
import { PATHS } from "../../../constants/paths";
import React from 'react';
import UpdateCategory from '../../../pages/Category/pages/UpdateCategory';


const UpdateCategoryRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.CATEGORY_UDPATE} component={UpdateCategory}></Route>
    </Switch>
  );
};

export default UpdateCategoryRoutes;
