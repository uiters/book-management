//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Author from "../../pages/Author/Author";
import UpdateAuthorPage from "../../pages/Author/pages/UpdateAuthorPage";
import { PATHS } from "../../constants/paths";
import NewAuthorPage from "../../pages/Author/pages/NewAuthorPage";
import AuthenticatedGuard from "../AuthenticatedGuard";


const AuthorRoutes = () => {
  return (
    <Switch>
      <AuthenticatedGuard exact path={PATHS.AUTHOR} component={Author}></AuthenticatedGuard>
      <AuthenticatedGuard exact path={PATHS.NEWAUTHOR} component={NewAuthorPage}></AuthenticatedGuard>
      <AuthenticatedGuard exact path={PATHS.AUTHOR_UDPATE} component={UpdateAuthorPage}></AuthenticatedGuard> 
    </Switch>
  );
};

export default React.memo(AuthorRoutes);
