import { URLS } from "./../../constants/url";
import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import axiosPublicClient from "../axios/axiosPublicClient";
import NewBookFormData from "../../types/form/NewBookFormData";

const bookApi = {
  getAllBooks: () => {
    const url = URLS.BOOK + "/all";
    return axiosPublicClient.get(url);
  },

  getByCategory: (category: string): Promise<AxiosResponse<BookModel[]>> => {
    const url = URLS.BOOK + "/category";

    const config = {
      params: {
        categoryName: category,
      },
    };

    return axiosPublicClient.get(url, config);
  },

  addNewBook: (newBook: NewBookFormData) => {
    const url = URLS.BOOK + "/";

    return axiosPublicClient.post(url, newBook);
  },
};

export default bookApi;
