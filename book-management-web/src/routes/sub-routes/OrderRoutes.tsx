import React from "react";
//@ts-ignore
import { Switch } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import OrderPage from "../../pages/Order/OrderPage";
import DetailOrderPage from "../../pages/Order/pages/detail/DetailOrderPage";
import AuthenticatedGuard from "../AuthenticatedGuard";

const BookRoutes = () => {
  return (
    <Switch>
      <AuthenticatedGuard
        exact
        path={PATHS.ORDER}
        component={OrderPage}
      ></AuthenticatedGuard>
      <AuthenticatedGuard
        exact
        path={PATHS.ORDER_DETAIL}
        component={DetailOrderPage}
      ></AuthenticatedGuard>
    </Switch>
  );
};

export default React.memo(BookRoutes);
