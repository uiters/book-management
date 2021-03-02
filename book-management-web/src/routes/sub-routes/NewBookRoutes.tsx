//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import NewBookPage from "../../pages/Book/pages/new-book/NewBookPage";

const NewBookRoutes = () => {
  return (
    <Switch>
      <Route path={PATHS.BOOK_NEW}>
        <NewBookPage></NewBookPage>
      </Route>
    </Switch>
  );
};

export default NewBookRoutes;
