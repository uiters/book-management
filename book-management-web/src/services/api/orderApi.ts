import { AxiosResponse } from "axios";
import { userInfo } from "os";
import { API_URLS } from "../../constants/api_url";
import DetailOrderModel from "../../types/models/DetailOrderModel";
import OrderModel from "../../types/models/OrderModel";
import axiosPublicClient from "../axios/axiosPublicClient";

const orderApi = {
  getAllOrder: (userId: string): Promise<AxiosResponse<OrderModel[]>> => {
    const url = API_URLS.ORDER;
    const config = {
      params: {
        userId: userId,
      },
    };

    return axiosPublicClient.get(url, config);
  },

  createOrder: (userId: string): Promise<AxiosResponse<string>> => {
    const url = API_URLS.ORDER + userId;

    return axiosPublicClient.post(url);
  },

  getOrderById: (orderId: string) : Promise<AxiosResponse<DetailOrderModel>> => {
    const url = API_URLS.ORDER + orderId;
    console.log(url);
    
    return axiosPublicClient.get(url);
  }
};

export default orderApi;
