//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Tabs from "../pages/Home/components/Tabs";
import Banner from "../pages/Home/components/Banner";
import Header from "../components/Header";
import MainPageRoutes from "./sub-routes/MainPageRoutes";
import CategoryPageRoutes from "./sub-routes/CategoryPageRoutes";
import NewBookRoutes from "./sub-routes/NewBookRoutes";

const HomeRoutes = () => {
  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <main className="App flex justify-center h-60 w-full rounded-xl pt-5">
            <div className="main-page h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
              <Header />
              <div className="body h-40 mt-8">
                <Tabs></Tabs>
                <Banner></Banner>
                <CategoryPageRoutes></CategoryPageRoutes>
                <NewBookRoutes></NewBookRoutes>
                <MainPageRoutes></MainPageRoutes>
              </div>
            </div>
          </main>
        )}
      >
      </Route>
    </Switch>
  );
};

export default React.memo(HomeRoutes);
