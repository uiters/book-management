//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../constants/paths";
import { ToastContainer } from "react-toastify";
import Author from "../pages/Author/Author";
import NewAuthorRoutes from "./sub-routes/NewAuthorRoutes";
import UpdateAuthorPage from "../pages/Author/pages/UpdateAuthorPage";

const AuthorRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.AUTHOR} component={Author}></Route>
      <Route exact path={PATHS.NEWAUTHOR} component={NewAuthorRoutes}></Route>
      <Route exact path={PATHS.AUTHOR_UDPATE} component={UpdateAuthorPage}></Route> 
    </Switch>
  );
};

export default React.memo(AuthorRoutes);
