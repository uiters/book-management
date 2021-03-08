//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
import cartApi from "../../services/api/cartApi";
import CartItemViewModel from "../../types/models/CartItemViewModel";
import User from "../../types/models/UserModel";
import CartItem from "./components/CartItem";
import NumberFormat from "react-number-format";
import CartModel from "../../types/models/CartModel";
import { PATHS } from "../../constants/paths";
import orderApi from "../../services/api/orderApi";
import { toastError, toastSuccess } from "../../services/toastService";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState<CartModel>({
    cartItems: [],
    totalPrice: 0,
  });
  const [cartItems, setCartItems] = useState<CartItemViewModel>([]);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [totalPrice, setTotalPrice] = useState(cart.totalPrice);
  const shippingFee = 50000;

  const onCartItemChange = (newQuantity: number, price: number) => {
    console.log(newQuantity);
    console.log(price);
  };

  const getCart = useCallback(async (userId: string) => {
    const response1 = await cartApi.getCart(userId);
    console.log(response1.data);
    setCart(response1.data);
  });

  useEffect(() => {
    if (user.id !== null) {
      getCart(user.id);
    }
  }, [cartItems.count]);

  const newOrder = () => {
    orderApi
      .createOrder(user.id)
      .then((response) => {
        console.log(response.data);

        if (response.status === 200) {
          toastSuccess("Create order successfull!");
          window.location.reload(); 
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);

        toastError(error.response.data.message);
      });
  };

  const listCartItems = cart.cartItems.map((item: CartItemViewModel) => {
    return (
      <CartItem
        key={item.id}
        item={item}
        onQuantityChange={onCartItemChange}
      ></CartItem>
    );
  });

  return (
    <div className="mt-4">
      <h1 className=" font-semibold text-3xl">Giỏ hàng</h1>
      <div className="h-auto w-full flex mt-6 space-x-3">
        <div className="listItems  w-full flex-grow space-y-3">
          {listCartItems}
          {cart.cartItems.lenght === undefined && cart.totalPrice === 0 && (
            <div className="pl-8 text-xl w-1/2 float-right">
              <p className="text-left font-semibold">
                Chưa có sản phẩm trong giỏ hàng.{" "}
                <a href={PATHS.MAIN} className="underline text-blue-500">
                  Quay lại
                </a>
              </p>
            </div>
          )}
        </div>
        <div className="info w-1/3 space-y-3">
          <div className="user-info bg-white w-full flex flex-col items-start p-3">
            <span className="text-left font-bold text-lg mb-3">
              Địa chỉ nhận hàng
            </span>
            <span>
              {user?.name} | {user?.email}
            </span>
            <span>{user?.address}</span>
          </div>
          <div className="bg-white flex flex-col w-full items-start">
            <div className="tempPrice border border-t-0 border-l-0 border-r-0 p-3 w-full ">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Tạm tính
              </span>
              <span className="text-left  text-lg mb-3 float-right">
                <NumberFormat
                  value={cart.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                ></NumberFormat>
              </span>
            </div>
            <div className="tempPrice border border-t-0 border-l-0 border-r-0 p-3 w-full ">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Phí vận chuyển
              </span>
              <span className="text-left  text-lg mb-3 float-right">
                <NumberFormat
                  value={shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                ></NumberFormat>
              </span>
            </div>
            <div className="totalPrice p-3 w-full">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Thành tiền
              </span>
              <span className="text-left  text-lg mb-3 float-right">
                <NumberFormat
                  value={cart.totalPrice + shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" đ"}
                ></NumberFormat>
              </span>
            </div>
          </div>
          <div className="buttons">
            <button
              className="hover:bg-red-600 bg-red-500 w-full p-2 rounded text-lg font-medium text-white"
              onClick={newOrder}
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
