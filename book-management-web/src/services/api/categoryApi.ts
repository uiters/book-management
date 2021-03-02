import { AxiosResponse } from "axios";
import axiosPublicClient from "../axios/axiosPublicClient";
import NewCategoryFormData from "../../types/form/NewCategoryFormData";
import { API_URLS } from "../../constants/api_url";

const categoryApi = {
  getAllCategorys: () => {
    const url = API_URLS.CATEGORY + "/getall";
    return axiosPublicClient.get(url);
  },

  addNewCategory: (newCategory: NewCategoryFormData) => {
    const url = API_URLS.CATEGORY + "/";

    return axiosPublicClient.post(url, newCategory);
  },
};

export default categoryApi;
