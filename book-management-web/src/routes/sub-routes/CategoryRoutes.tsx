//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import Category from "../../pages/Category/Category";
import NewCategory from "../../pages/Category/pages/NewCategory";
import UpdateCategory from "../../pages/Category/pages/UpdateCategory";
import AuthenticatedGuard from "../AuthenticatedGuard";



const CategoryRoutes = () => {
  return (
    <Switch>   
      <AuthenticatedGuard exact path={PATHS.CATEGORY} component={Category}></AuthenticatedGuard>
      <AuthenticatedGuard exact path={PATHS.NEWCATEGORY} component={NewCategory}></AuthenticatedGuard> 
      <AuthenticatedGuard exact path={PATHS.CATEGORY_UDPATE} component={UpdateCategory}></AuthenticatedGuard>  
    </Switch>
  );
};

export default React.memo(CategoryRoutes);
