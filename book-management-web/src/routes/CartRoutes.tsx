//@ts-ignore
import { Switch, Route } from "react-router-dom";
//@ts-ignore
import React from "react";
import AuthenticatedGuard from "./AuthenticatedGuard";
import { PATHS } from "../constants/paths";
import CartPage from "../pages/Cart/CartPage";

const CartRoutes = () => {
  return (
    <Switch>
      <AuthenticatedGuard
        exact
        path={PATHS.CART}
        component={CartPage}
      ></AuthenticatedGuard>
    </Switch>
  );
};

export default React.memo(CartRoutes);
