//@ts-ignore
import { Switch, Route } from "react-router-dom";
//@ts-ignore
import React, { useMemo } from "react";
import { PATHS } from "../constants/paths";
import NewBookPage from "../pages/Book/pages/new-book/NewBookPage";
import DetailBookPage from "../pages/Book/pages/detail/DetailBookPage";
import BookPage from "../pages/Book/BookPage";
import UpdateBookPage from "../pages/Book/pages/update-book/UpdateBookPage";

const BookRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.BOOK_NEW} component={NewBookPage}></Route>
      <Route exact path={PATHS.BOOK_DETAIL} component={DetailBookPage}></Route>
      <Route exact path={PATHS.BOOK_UPDATE} component={UpdateBookPage}></Route>
      <Route exact path={PATHS.BOOK} component={BookPage}></Route>
    </Switch>
  );
};

export default React.memo(BookRoutes);
