//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
import cartApi from "../../services/api/cartApi";
import CartItemViewModel from "../../types/models/CartItemViewModel";
import User from "../../types/models/UserModel";
import CartItem from "./components/CartItem";
import NumberFormat from "react-number-format";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemViewModel>([]);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingFee = 50000;

  // const getCartItems = (userId: string) => {
  //   cartApi.getByUserId(userId).then((response) => {
  //     const data = response.data;
  //     setCartItems([...data]);
  //     console.log(cartItems);

  //     let tempTotal = 0;
  //     cartItems.forEach((item: CartItemViewModel) => {
  //       tempTotal += item.book.price * item.quantity;
  //       console.log(tempTotal);
  //     });
  //     setTotalPrice(tempTotal);
  //   });
  // };

  const getCartItems = useCallback(async (userId: string) => {
    const response = await cartApi.getByUserId(userId);
    console.log(response.data);
    setCartItems(response.data);
    console.log(cartItems);
  });

  useEffect(() => {
    if (user.id !== null) {
      getCartItems(user.id);
    }
  }, [cartItems.count]);

  const listCartItems = cartItems.map((item: CartItemViewModel) => {
    return <CartItem key={item.id} {...item}></CartItem>;
  });

  return (
    <div className="mt-4">
      <h1 className=" font-semibold text-3xl">Giỏ hàng</h1>
      <div className="h-auto w-full flex mt-10 space-x-3">
        <div className="listItems  w-full flex-grow space-y-3">
          {listCartItems}
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
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
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
                  suffix={"đ"}
                ></NumberFormat>
              </span>
            </div>
            <div className="totalPrice p-3 w-full">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Thành tiền
              </span>
              <span className="text-left  text-lg mb-3 float-right">
                <NumberFormat
                  value={totalPrice + shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                ></NumberFormat>
              </span>
            </div>
          </div>
          <div className="buttons">
            <button className="hover:bg-red-600 bg-red-500 w-full p-2 rounded text-lg font-medium text-white">
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
