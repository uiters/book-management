//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
//@ts-ignore
import { useHistory } from "react-router-dom";
import cartApi from "../../services/api/cartApi";
import CartItemViewModel from "../../types/models/CartItemViewModel";
import User from "../../types/models/UserModel";
import CartItem from "./components/CartItem";
import NumberFormat from "react-number-format";
import CartModel from "../../types/models/CartModel";
import { PATHS } from "../../constants/paths";

const CartPage = () => {
  const [cart, setCart] = useState<CartModel>({
    cartItems: [],
    totalPrice: 0,
  });
  const history = useHistory();
  const [cartItems, setCartItems] = useState<CartItemViewModel>([]);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [isDisabled, setIsDisabled] = useState(false);

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

  useEffect(() => {
    if (cart.cartItems.length === undefined) {
      setIsDisabled(true);
      return;
    }

    setIsDisabled(false);
  }, [isDisabled]);

  const newOrder = () => {
    history.push("/cart/checkout");
  };

  const listCartItems = cart.cartItems.map((item: CartItemViewModel) => {
    return <CartItem key={item.id} item={item}></CartItem>;
  });
  
  console.log(cart.cartItems);
  
  return (
    <div className="mt-4">
      <h1 className="font-semibold text-3xl">Cart</h1>
      <div className="h-auto w-full flex mt-6 space-x-3">
        <div className="listItems w-full flex-grow space-y-3">
          {listCartItems}
          {cart.cartItems.lengtht === undefined && cart.totalPrice === 0 && (
            <div className="pl-8 text-xl w-1/2 float-right">
              <p className="text-left font-semibold">
                You have no item in cart.{" "}
                <a href={PATHS.MAIN} className="underline text-blue-500">
                  Back to main
                </a>
              </p>
            </div>
          )}
        </div>
        <div className="info w-1/3 space-y-3">
          <div className="user-info bg-white w-full flex flex-col items-start p-3">
            <span className="text-left font-bold text-lg mb-3">Address</span>
            <span>
              {user?.name} | {user?.email}
            </span>
            <span>{user?.address}</span>
          </div>
          <div className="bg-white flex flex-col w-full items-start">
            <div className="tempPrice border border-t-0 border-l-0 border-r-0 p-3 w-full ">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Approximate Price
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
            <div className="totalPrice p-3 w-full">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Total Price
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
          </div>
          <div className="buttons">
            <button
              className="hover:bg-red-600 bg-red-500 w-full p-2 rounded text-lg font-medium text-white"
              onClick={newOrder}
              disabled={cart.cartItems.length === 0 ? true : false}
            >
              Create New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
