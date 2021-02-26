//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Category from "../pages/Category/Category";
import { PATHS } from "../constants/paths";
import NewCategoryRoutes from "./sub-routes/NewCategoryRoutes";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

const CategoryRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={PATHS.CATEGORY}
        render={() => (
          <main className="App flex justify-center h-60 w-full rounded-xl pt-5">
            <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
              <Header />
              <div className="body h-40 mt-8">
                <Category></Category>
                <NewCategoryRoutes></NewCategoryRoutes>
                <ToastContainer />
              </div>
            </div>
          </main>
        )}
      >

      </Route>
    </Switch>
  );
};

export default React.memo(CategoryRoutes);
