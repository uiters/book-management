//@ts-ignore
import { Switch, Route } from "react-router-dom";
import { PATHS } from "../../../constants/paths";
import React from 'react';
import UpdateAuthorPage from "../../../pages/Author/pages/UpdateAuthorPage";


const UpdateAuthorRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.AUTHOR_UDPATE} component={UpdateAuthorPage}></Route>
    </Switch>
  );
};

export default UpdateAuthorRoutes;