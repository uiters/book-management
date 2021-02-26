//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import DetailBookPage from "../../pages/Home/pages/DetailBookPage";

const DetailBookRoutes = () => {
    return (
        <Switch>
            <Route exact path={PATHS.DETAILS}><DetailBookPage ></DetailBookPage></Route>
        </Switch>
    );
}

export default DetailBookRoutes;