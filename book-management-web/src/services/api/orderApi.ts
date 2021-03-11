import { AxiosResponse } from "axios";
import { API_URLS } from "../../constants/api_url";
import DetailOrderModel from "../../types/models/DetailOrderModel";
import OrderModel from "../../types/models/OrderModel";
import axiosPrivateClient from "../axios/axiosPrivateClient";

const orderApi = {
  getAllOrder: (userId: string): Promise<AxiosResponse<OrderModel[]>> => {
    const url = API_URLS.ORDER;
    const config = {
      params: {
        userId: userId,
      },
    };

    return axiosPrivateClient.get(url, config);
  },

  createOrder: (order: OrderModel): Promise<AxiosResponse<any>> => {
    const url = API_URLS.ORDER;

    return axiosPrivateClient.post(url, order);
  },

  getOrderById: (orderId: string) : Promise<AxiosResponse<DetailOrderModel>> => {
    const url = API_URLS.ORDER + orderId;
    console.log(url);
    
    return axiosPrivateClient.get(url);
  }
};

export default orderApi;
