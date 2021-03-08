//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import Category from "../../pages/Category/Category";
import NewCategory from "../../pages/Category/pages/NewCategory";
import UpdateCategory from "../../pages/Category/pages/UpdateCategory";



const CategoryRoutes = () => {
  return (
    <Switch>   
      <Route exact path={PATHS.CATEGORY} component={Category}></Route>
      <Route exact path={PATHS.NEWCATEGORY} component={NewCategory}></Route> 
      <Route exact path={PATHS.CATEGORY_UDPATE} component={UpdateCategory}></Route>  
    </Switch>
  );
};

export default React.memo(CategoryRoutes);
