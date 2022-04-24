//@ts-ignore
import { Switch } from "react-router-dom";
//@ts-ignore
import React, { useMemo } from "react";
import AuthenticatedGuard from "../AuthenticatedGuard";
import { PATHS } from "../../constants/paths";
import AccountPage from "../../pages/Account/AccountPage";


const AccountRoutes = () => {
    return (
      <Switch>
        <AuthenticatedGuard exact path={PATHS.ACCOUNT} component={AccountPage}></AuthenticatedGuard>
      </Switch>
    );
  };

  export default useMemo(AccountRoutes);