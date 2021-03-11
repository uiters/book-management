//@ts-ignore
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//@ts-ignore
import React, { useMemo } from "react";
import Tabs from "../pages/Home/components/Tabs";
import MainPageRoutes from "./sub-routes/MainPageRoutes";
import CategoryPageRoutes from "./sub-routes/CategoryPageRoutes";
import { PATHS } from "../constants/paths";
import Header from "../components/Header";
import BookRoutes from "./sub-routes/BookRoutes";
import PublisherRoutes from "./sub-routes/PublisherRoutes";
import AuthorRoutes from "./sub-routes/AuthorRoutes";
import CartRoutes from "./sub-routes/CartRoutes";
import CategoryRoutes from "./sub-routes/CategoryRoutes";
import OrderRoutes from "./sub-routes/OrderRoutes";
import UserRoutes from "./sub-routes/UserRoutes";
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
          <main className="App flex justify-center w-full h-screen mt-10 min-h-screen pb-24">
            <Header></Header>
            <div className="main-page min-h-full w-10/12 flex-row gap-y-5 justify-center rounded-xl text-center">
              <div className="body h-40 mt-8">
                <Tabs></Tabs>
                <BookRoutes></BookRoutes>
                <PublisherRoutes />
                <AuthorRoutes />
                <UserRoutes />
                <CartRoutes />
                <CategoryRoutes />
                <CategoryPageRoutes />
                <OrderRoutes/>
                <MainPageRoutes />
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
