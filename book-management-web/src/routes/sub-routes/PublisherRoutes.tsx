//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import Publisher from "../../pages/Publisher/Publisher";
import UpdatePublisher from "../../pages/Publisher/pages/UpdatePublisher";
import NewPublisher from "../../pages/Publisher/pages/NewPublisher";
import AuthenticatedGuard from "../AuthenticatedGuard";

const PublisherRoutes = () => {
  return (
    <Switch>
      <AuthenticatedGuard exact path={PATHS.PUBLISHER} component={Publisher}></AuthenticatedGuard>
      <AuthenticatedGuard exact path={PATHS.NEWPUBLISHER} component={NewPublisher}></AuthenticatedGuard>
      <AuthenticatedGuard exact path={PATHS.PUBLISHER_UDPATE} component={UpdatePublisher}></AuthenticatedGuard> 
    </Switch>
  );
};

export default PublisherRoutes;
