//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../constants/paths";
import { ToastContainer } from "react-toastify";
import Publisher from "../pages/Publisher/Publisher";
import UpdatePublisher from "../pages/Publisher/pages/UpdatePublisher";
import NewPublisherRoutes from "./sub-routes/NewPublisherRoutes";


const PublisherRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.PUBLISHER} component={Publisher}></Route>
      <Route exact path={PATHS.NEWPUBLISHER} component={NewPublisherRoutes}></Route>
      <Route exact path={PATHS.PUBLISHER_UDPATE} component={UpdatePublisher}></Route> 
    </Switch>
  );
};

export default React.memo(PublisherRoutes);
