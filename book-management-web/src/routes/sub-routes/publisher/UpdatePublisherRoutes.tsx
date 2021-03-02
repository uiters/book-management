//@ts-ignore
import { Switch, Route } from "react-router-dom";
import { PATHS } from "../../../constants/paths";
import React from 'react';
import UpdatePublisher from "../../../pages/Publisher/pages/UpdatePublisher";


const UpdatePublisherRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.PUBLISHER_UDPATE} component={UpdatePublisher}></Route>
    </Switch>
  );
};

export default UpdatePublisherRoutes;