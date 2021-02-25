import { URLS } from "./../../constants/url";
import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import axiosPublicClient from "../axios/axiosPublicClient";
import NewCategoryFormData from "../../types/form/NewCategoryFormData";

const categoryApi = {
  getAllCategorys: () => {
    const url = URLS.CATEGORY + "/getall";
    return axiosPublicClient.get(url);
  },

  addNewCategory: (newCategory: NewCategoryFormData) => {
    const url = URLS.CATEGORY + "/";

    return axiosPublicClient.post(url, newCategory);
  },
};

export default categoryApi;
