//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import CategoryPage from "../../pages/Home/pages/CategoryPage";
import { PATHS } from "../../constants/paths";

const CategoryPageRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.LITERATURE}>
        <CategoryPage title="Sách văn học"></CategoryPage>
      </Route>
      <Route exact path={PATHS.ECONOMIC}>
        <CategoryPage title="Sách kinh tế"></CategoryPage>
      </Route>
      <Route exact path={PATHS.LIFESKILL}>
        <CategoryPage title="Sách kĩ năng"></CategoryPage>
      </Route>
      <Route exact path={PATHS.LANGUAGE}>
        <CategoryPage title="Sách Học Ngoại Ngữ"></CategoryPage>
      </Route>
      <Route exact path={PATHS.KNOWLEDGE}>
        <CategoryPage title="Sách Kiến Thức Tổng Hợp"></CategoryPage>
      </Route>
      <Route exact path={PATHS.RAISECHILD}>
        <CategoryPage title="Sách Nuôi Dạy Con"></CategoryPage>
      </Route>
    </Switch>
  );
};

export default CategoryPageRoutes;
