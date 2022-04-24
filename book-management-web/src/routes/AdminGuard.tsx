//@ts-ignore
import { Route, Redirect } from "react-router-dom";
import { PATHS } from "../constants/paths";

const AdminGuard = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAdmin = role === "Admin" || role === "Officer" ? true : false;
    
  return (
    <Route
      {...rest}
      render={(props: any) =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: PATHS.MAIN }} />
        )
      }
    />
  );
};

export default AdminGuard;
