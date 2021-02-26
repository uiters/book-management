//@ts-ignore
import { Switch, Route } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import DetailBookPage from "../../pages/Book/detail/DetailBookPage";

const DetailBookRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.BOOK_DETAIL} component={DetailBookPage}></Route>
    </Switch>
  );
};

export default DetailBookRoutes;
