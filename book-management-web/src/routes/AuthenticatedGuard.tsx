//@ts-ignore
import { Route, Redirect } from "react-router-dom";
import { PATHS } from "../constants/paths";

const AuthenticatedGuard = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: PATHS.LOGIN }} />
        )
      }
    />
  );
};

export default AuthenticatedGuard;
