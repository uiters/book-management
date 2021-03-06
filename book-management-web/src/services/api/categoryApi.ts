import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import queryString from 'query-string';
import axiosPublicClient from "../axios/axiosPublicClient";
import NewCategoryFormData from "../../types/form/NewCategoryFormData";
import { API_URLS } from "../../constants/api_url";
import CategoryModel from "../../types/models/CategoryModel";
import PaginationModel from "../../types/models/PaginationModel";

const categoryApi = {
  getAllCategorys: () => {
    const url = API_URLS.CATEGORY + "/getall";
    return axiosPublicClient.get(url);
  },

  getPagedCategory: (searchTitle: string, page: number, countPerPage: number) => {
    const url = API_URLS.CATEGORY + "/getbyfilter/"; 

    const config = {
      params: {
        searchTitle: searchTitle,
        page: page,
        countPerPage: countPerPage
      },
    };

    return axiosPublicClient.get(url, config);
  },

  addNewCategory: (newCategory: NewCategoryFormData) => {
    const url = API_URLS.CATEGORY + "/add";

    return axiosPublicClient.post(url, newCategory);
  },

  getById: (id: string): Promise<AxiosResponse<CategoryModel>> => {
    const url = API_URLS.CATEGORY + '/getbyid/' + id;

    return axiosPublicClient.get(url);
  },

  updateCategory: (id: string, newCategory: NewCategoryFormData) => {
    const url = API_URLS.CATEGORY + "/update/" + id;

    const config = {
      params: {
        id: id,
      },
    };

    return axiosPublicClient.put(url, newCategory, config);
  },

  deleteCategory: (id: string) : Promise<AxiosResponse<CategoryModel[]>> => {
    const url = API_URLS.CATEGORY + "/delete/" + id;

    const config = {
      params: {
        id: id,
      },
    };

    return axiosPublicClient.delete(url, config);
  },

};

export default categoryApi;



    // const config = {
    //   params: {
    //     searchTitle: param.title,
    //     page: param.page,
    //     pageSize: param.size
    //   },
    // };