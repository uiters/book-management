//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Category from "../pages/Category/Category";
import { PATHS } from "../constants/paths";
import NewCategoryRoutes from "./sub-routes/NewCategoryRoutes";
import UpdateCategoryRoutes from "./sub-routes/category/UpdateCategoryRoutes";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import UpdateCategory from "../pages/Category/pages/UpdateCategory";

const CategoryRoutes = () => {
  return (
    <Switch>
      {/* <Route
        exact
        path={PATHS.CATEGORY}
        render={() => (
          <main className="App flex justify-center h-60 w-full rounded-xl pt-5">
            <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
              <div className="body h-40 mt-8">
                <Category></Category>
              </div>
            </div>
          </main>
        )}
      >

      </Route>

      <Route 
      exact 
      path={PATHS.NEWCATEGORY} 
      render={() => (
        <main className="App flex justify-center h-60 w-full rounded-xl pt-5">
          <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
            <div className="body h-40 mt-8">
              <NewCategoryRoutes></NewCategoryRoutes>
            </div>
          </div>
        </main>
      )}>

      </Route> */}
      
      <Route exact path={PATHS.CATEGORY} component={Category}></Route>
      <Route exact path={PATHS.NEWCATEGORY} component={NewCategoryRoutes}></Route> 
      <Route exact path={PATHS.CATEGORY_UDPATE} component={UpdateCategoryRoutes}></Route>  
    </Switch>
  );
};

export default React.memo(CategoryRoutes);
