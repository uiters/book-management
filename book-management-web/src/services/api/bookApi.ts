import { API_URLS } from "../../constants/api_url";
import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import axiosPublicClient from "../axios/axiosPublicClient";
import NewBookFormData from "../../types/form/NewBookFormData";

const bookApi = {
  getAllBooks: () => {
    const url = API_URLS.BOOK + "/all";
    return axiosPublicClient.get(url);
  },

  getByCategory: (category: string): Promise<AxiosResponse<BookModel[]>> => {
    const url = API_URLS.BOOK + "/category";

    const config = {
      params: {
        categoryName: category,
      },
    };

    return axiosPublicClient.get(url, config);
  },

  addNewBook: (newBook: NewBookFormData) => {
    const url = API_URLS.BOOK + "/";

    return axiosPublicClient.post(url, newBook);
  },

  getById: (id: string): Promise<AxiosResponse<BookModel>> => {
    const url = API_URLS.BOOK + '/' + id;

    return axiosPublicClient.get(url);
  }
};

export default bookApi;
