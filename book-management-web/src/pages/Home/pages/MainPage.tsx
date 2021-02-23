import React from "react";
import { PATHS } from "../../../constants/paths";
import ListBook from "../components/ListBook";

const MainPage = () => {
  return (
    <div>
      <ListBook title={"Popular Now"} category={PATHS.POPULAR}></ListBook>
      <ListBook title={"Văn học"} category={PATHS.LITERATURE} ></ListBook>
      <ListBook title={"Kinh tế"} category={PATHS.ECONOMIC}></ListBook>
      <ListBook title={"Kĩ năng sống"} category={PATHS.LIFESKILL}></ListBook>
    </div>
  );
};

export default MainPage;
