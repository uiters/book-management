//@ts-ignore
import { Switch, Route } from "react-router-dom";
//@ts-ignore
import React, { useMemo } from "react";
import { PATHS } from "../../constants/paths";
import AuthenticatedGuard from "../AuthenticatedGuard";
import NewBookPage from "../../pages/Book/pages/new-book/NewBookPage";
import DetailBookPage from "../../pages/Book/pages/detail/DetailBookPage";
import UpdateBookPage from "../../pages/Book/pages/update-book/UpdateBookPage";
import BookPage from "../../pages/Book/BookPage";
import SearchBookPage from "../../pages/Book/pages/search-book/SearchBookPage";
import AdminGuard from "../AdminGuard";
const BookRoutes = () => {
  return (
    <Switch>
      <AdminGuard
        exact
        path={PATHS.BOOK_NEW}
        component={NewBookPage}
      ></AdminGuard>
      <Route exact path={PATHS.BOOK_SEARCH} component={SearchBookPage}></Route>
      <Route exact path={PATHS.BOOK_DETAIL} component={DetailBookPage}></Route>
      <AuthenticatedGuard
        exact
        path={PATHS.BOOK_UPDATE}
        component={UpdateBookPage}
      ></AuthenticatedGuard>
      <AuthenticatedGuard
        exact
        path={PATHS.BOOK}
        component={BookPage}
      ></AuthenticatedGuard>
    </Switch>
  );
};

export default React.memo(BookRoutes);
