//@ts-ignore
import React, { useState, useEffect } from "react";
import categoryApi from "../../../services/api/categoryApi";
import CategoryModel from "../../../types/models/CategoryModel";
import ListBook from "../../Book/components/ListBook";
import Banner from "../components/Banner";

const MainPage = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const getCategories = () => {
    categoryApi
      .getCategoryForMain()
      .then((response) => {
        console.log(response.data);
        const data = response.data;

        setCategories([...data]);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    getCategories();
  }, [categories.count]);

  const categoriesUI = categories.map((category: CategoryModel) => {
    return (
      <ListBook
        key={category.id}
        title={category.name}
        category={category.name}
        link={"/" + category.slug}
      ></ListBook>
    );
  });

  return (
    <div className="space-y-6">
      <Banner></Banner>
      {categoriesUI}
    </div>
  );
};

export default MainPage;
