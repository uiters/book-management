import { AxiosResponse } from "axios";
import { API_URLS } from "../../constants/api_url";
import CartItemModel from "../../types/models/CartItemModel";
import CartItemViewModel from "../../types/models/CartItemViewModel";
import axiosPublicClient from "../axios/axiosPublicClient";

const cartApi = {
  addCartItem: (item: CartItemModel): Promise<AxiosResponse<string>> => {
    const url = API_URLS.CART + "/";

    return axiosPublicClient.post(url, item);
  },

  getByUserId: (
    userId: string
  ): Promise<AxiosResponse<CartItemViewModel[]>> => {
    const url = API_URLS.CART + "/";
    const config = {
      params: {
        userId: userId,
      },
    };

    return axiosPublicClient.get(url, config);
  },

  deleteCartItem: (cartId: string): Promise<AxiosResponse<string>> => {
    const url = API_URLS.CART + "/" + cartId;

    return axiosPublicClient.delete(url);
  },
};

export default cartApi;
