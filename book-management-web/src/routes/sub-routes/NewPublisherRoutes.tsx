//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../../constants/paths";
import NewPublisher from "../../pages/Publisher/pages/NewPublisher";

const NewPublisherRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.NEWPUBLISHER}>
        <NewPublisher></NewPublisher>
      </Route>
    </Switch>
  );
};

export default NewPublisherRoutes;
