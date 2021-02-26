//@ts-ignore
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//@ts-ignore
import React, { useMemo } from "react";
import Tabs from "../pages/Home/components/Tabs";
import MainPageRoutes from "./sub-routes/MainPageRoutes";
import CategoryPageRoutes from "./sub-routes/CategoryPageRoutes";
import { PATHS } from "../constants/paths";
import BookRoutes from "./BookRoutes";

const HomeRoutes = () => {
  const paths = useMemo(
    () =>
      Object.values(PATHS).filter(
        (p) => p !== PATHS.LOGIN && p !== PATHS.REGISTER
      ),
    []
  );

  return (
    <Switch>
      <Route
        exact
        path={paths}
        render={() => (
          <main className="App flex justify-center w-full h-screen mt-10">
            <div className="main-page w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
              <div className="body h-40 mt-8">
                <Tabs></Tabs>
                <CategoryPageRoutes></CategoryPageRoutes>
                <BookRoutes></BookRoutes>
                <MainPageRoutes></MainPageRoutes>
                <ToastContainer />
              </div>
            </div>
          </main>
        )}
      ></Route>
    </Switch>
  );
};

export default React.memo(HomeRoutes);
