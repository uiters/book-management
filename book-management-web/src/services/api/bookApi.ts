import axiosPublicClient from "../axios/axiosPublicClient";

const bookApi = {
  getAllBooks: () => {
    const url = "/all";
    return axiosPublicClient.get(url);
  },
};

export default bookApi;