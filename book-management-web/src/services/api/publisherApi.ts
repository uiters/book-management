import { AxiosResponse } from "axios";
import BookModel from "../../types/models/BookModel";
import axiosPublicClient from "../axios/axiosPublicClient";
import { API_URLS } from "../../constants/api_url";
import NewPublisherFormData from "../../types/form/NewPublisherFormData";
import PublisherModelPage from "../../types/models/PublisherModelPage";

const publisherApi = {
    getAllPublisher: () => {
      const url = API_URLS.PUBLISHER + "/getall";
      return axiosPublicClient.get(url);
    },
  
    getById: (id: string): Promise<AxiosResponse<PublisherModelPage>> => {
        const url = API_URLS.PUBLISHER + '/getbyid/' + id;
    
        return axiosPublicClient.get(url);
      },

      getForListParams: () => {
        const url = API_URLS.PUBLISHER + "/getforlistparams";
        return axiosPublicClient.get(url);
      },
      
      getPagedPublisher: (searchKey: number, searchTitle: string, page: number, countPerPage: number) => {
        const url = API_URLS.PUBLISHER + "/getbyfilter/";
    
        const config = {
          params: {
            searchKey: searchKey,
            searchTitle: searchTitle,
            page: page,
            countPerPage: countPerPage
          },
        };
    
        return axiosPublicClient.get(url, config);
      },

    addNewPublisher: (newPublisher: NewPublisherFormData) => {
      const url = API_URLS.PUBLISHER + "/add";
  
      return axiosPublicClient.post(url, newPublisher);
    },

    updatePublisher: (id: string, newPublisher: NewPublisherFormData) => {
      const url = API_URLS.PUBLISHER + "/update/" + id;
  
      const config = {
        params: {
          id: id,
        },
      };
  
      return axiosPublicClient.put(url, newPublisher, config);
    },
  
    deletePublisher: (id: string) : Promise<AxiosResponse<PublisherModelPage[]>> => {
      const url = API_URLS.PUBLISHER + "/delete/" + id;
  
      const config = {
        params: {
          id: id,
        },
      };
  
      return axiosPublicClient.delete(url, config);
    }

  };
  
  export default publisherApi;