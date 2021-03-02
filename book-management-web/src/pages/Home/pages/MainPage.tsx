import React from "react";
import { PATHS } from "../../../constants/paths";
import ListBook from "../../Book/components/ListBook";
import Banner from "../components/Banner";

const MainPage = () => {
  return (
    <div className="space-y-6">
      <Banner></Banner>
      <ListBook title={"Văn học"} category={"Sách văn học"} link={PATHS.LITERATURE}></ListBook>
      <ListBook title={"Kinh tế"} category={"Sách kinh tế"} link={PATHS.ECONOMIC}></ListBook>
      <ListBook title={"Kĩ năng sống"} category={"Sách kĩ năng"} link={PATHS.LIFESKILL}></ListBook>
    </div>
  );
};

export default MainPage;
