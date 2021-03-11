//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import Users from "../../pages/Users/Users";
import NewUser from "../../pages/Users/pages/NewUser";
import UpdateUser from "../../pages/Users/pages/UpdateUser";

const UserRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.USERS} component={Users}></Route>
      <Route exact path={PATHS.NEWUSERS} component={NewUser}></Route>
      <Route exact path={PATHS.USERS_UDPATE} component={UpdateUser}></Route> 
    </Switch>
  );
};

export default UserRoutes;
