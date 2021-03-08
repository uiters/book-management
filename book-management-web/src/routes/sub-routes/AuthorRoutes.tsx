//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import Author from "../../pages/Author/Author";
import UpdateAuthorPage from "../../pages/Author/pages/UpdateAuthorPage";
import { PATHS } from "../../constants/paths";
import NewAuthorPage from "../../pages/Author/pages/NewAuthorPage";


const AuthorRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.AUTHOR} component={Author}></Route>
      <Route exact path={PATHS.NEWAUTHOR} component={NewAuthorPage}></Route>
      <Route exact path={PATHS.AUTHOR_UDPATE} component={UpdateAuthorPage}></Route> 
    </Switch>
  );
};

export default React.memo(AuthorRoutes);
