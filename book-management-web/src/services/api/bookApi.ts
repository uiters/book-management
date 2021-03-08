import { API_URLS } from "../../constants/api_url";
import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import axiosPublicClient from "../axios/axiosPublicClient";
import NewBookFormData from "../../types/form/NewBookFormData";
import { idText } from "typescript";
import UpdateBookFormData from "../../types/form/UpdateBookFormData";
import DetailBookModel from "../../types/models/DetailBookModel";

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
    const formData = new FormData();

    formData.append("title", newBook.title);
    formData.append("price", newBook.price.toString());
    formData.append("description", newBook.description);
    formData.append("pages", newBook.pages.toString());
    formData.append("sku", newBook.sku);
    formData.append("authorName", newBook.authorName);
    formData.append("publisherName", newBook.publisherName);

    newBook.photos.forEach(photo => {
      formData.append("photos", photo);
    });

    return axiosPublicClient.post(url, formData);
  },

  getById: (id: string): Promise<AxiosResponse<BookModel>> => {
    const url = API_URLS.BOOK + '/' + id + '/1';

    return axiosPublicClient.get(url);
  },

  getDetailBookData: (id: string): Promise<AxiosResponse<DetailBookModel>> => {
    const url = API_URLS.BOOK + '/' + id;

    return axiosPublicClient.get(url);
  },

  updateBook: (updateBook: UpdateBookFormData, id: string) => {
    const url = API_URLS.BOOK + '/' + id;

    return axiosPublicClient.put(url, updateBook);
  },

  delelteBook: (id: string): Promise<AxiosResponse<BookModel>> => {
    const url = API_URLS.BOOK + '/' + id;

    return axiosPublicClient.delete(url);
  },
};

export default bookApi;
