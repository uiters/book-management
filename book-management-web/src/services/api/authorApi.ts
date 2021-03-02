import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import axiosPublicClient from "../axios/axiosPublicClient";
import { API_URLS } from "../../constants/api_url";
import NewAuthorFormData from "../../types/form/NewAuthorFormData";
import AuthorModel from "../../types/models/AuthorModel";
import AuthorModelPage from "../../types/models/AuthorModelPage";

const authorApi = {
    getAllAuthors: () => {
      const url = API_URLS.AUTHOR + "/getall";
      return axiosPublicClient.get(url);
    },
  
    getById: (id: string): Promise<AxiosResponse<AuthorModelPage>> => {
        const url = API_URLS.AUTHOR + '/getbyid/' + id;
    
        return axiosPublicClient.get(url);
      },

      updateAuthor: (id: string, newAuthor: NewAuthorFormData) => {
        const url = API_URLS.AUTHOR + "/update/" + id;
    
        const config = {
          params: {
            id: id,
          },
        };
    
        return axiosPublicClient.put(url, newAuthor, config);
      },

    addNewAuthor: (newAuthor: NewAuthorFormData) => {
      const url = API_URLS.AUTHOR + "/add";
  
      return axiosPublicClient.post(url, newAuthor);
    },
  
    deleteAuthor: (id: string) : Promise<AxiosResponse<AuthorModelPage[]>> => {
      const url = API_URLS.AUTHOR + "/delete/" + id;
  
      const config = {
        params: {
          id: id,
        },
      };
  
      return axiosPublicClient.delete(url, config);
    }

  };
  
  export default authorApi;