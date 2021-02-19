//@ts-ignore
import { Switch, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home/Home";
import Routes from "./routes/Routes";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
