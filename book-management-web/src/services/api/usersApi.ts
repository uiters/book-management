import { AxiosResponse } from "axios";
import axiosPublicClient from "../axios/axiosPublicClient";
import { API_URLS } from "../../constants/api_url";
import UsersViewModel from "../../types/models/UsersViewModel";
import NewUserFormData from "../../types/form/NewUserFormData";
import UpdateUsersFormData from "../../types/form/UpdateUsersFormData";
import axiosPrivateClient from "../axios/axiosPrivateClient";


const usersApi = {
  getAllUsers: () => {
    const url = API_URLS.AUTHOR + "/getall";
    return axiosPrivateClient.get(url);
  },

  getById: (id: string): Promise<AxiosResponse<UsersViewModel>> => {
    const url = API_URLS.USERS + '/getbyid/' + id;

    return axiosPrivateClient.get(url);
  },

  addNewUsers: (newUsers: NewUserFormData) => {
    const url = API_URLS.USERS + "/register";

    return axiosPrivateClient.post(url, newUsers);
  },

  getPagedUsers: (searchKey: string, searchTitle: string, page: number, countPerPage: number) => {
    const url = API_URLS.USERS + "/getbyfilter";

    const config = {
      params: {
        searchKey: searchKey,
        searchTitle: searchTitle,
        page: page,
        countPerPage: countPerPage
      },
    };

    return axiosPrivateClient.get(url, config);
  },

  updateUser: (id: string, updateAuthor: UpdateUsersFormData) => {
    const url = API_URLS.USERS + "/update/" + id;

    const config = {
      params: {
        id: id,
      },
    };

    return axiosPrivateClient.put(url, updateAuthor, config);
  },

  deleteUser: (id: string): Promise<AxiosResponse<UsersViewModel[]>> => {
    const url = API_URLS.USERS + "/delete/" + id;

    const config = {
      params: {
        id: id,
      },
    };

    return axiosPrivateClient.delete(url, config);
  }

};

export default usersApi;