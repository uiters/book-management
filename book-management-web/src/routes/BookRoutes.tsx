//@ts-ignore
import { Switch, Route } from "react-router-dom";
//@ts-ignore
import React, { useMemo } from "react";
//@ts-ignore
import { useRouteMatch } from "react-router-dom";
import { PATHS } from "../constants/paths";
import NewBookPage from "../pages/Book/pages/NewBookPage";
import DetailBookPage from "../pages/Book/detail/DetailBookPage";

const BookRoutes = () => {
  return (
    <Switch>
      {/* <Route
        path={paths}
        render={() => (
          <div>
            <DetailBookRoutes></DetailBookRoutes>
            <NewBookRoutes></NewBookRoutes>
          </div>
        )}
      ></Route> */}
      <Route exact path={PATHS.BOOK_NEW} component={NewBookPage}></Route>
      <Route exact path={PATHS.BOOK_DETAIL} component={DetailBookPage}></Route>
    </Switch>
  );
};

export default React.memo(BookRoutes);
