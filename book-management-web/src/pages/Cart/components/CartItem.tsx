//@ts-ignore
import React, { useState } from "react";
import CartItemViewModel from "../../../types/models/CartItemViewModel";
import User from "../../../types/models/UserModel";
import NumberFormat from "react-number-format";
import cartApi from "../../../services/api/cartApi";
import { toastSuccess } from "../../../services/toastService";
import { PATHS } from "../../../constants/paths";

const CartItem = ({
  item,
  onQuantityChange,
}: {
  item: CartItemViewModel;
  onQuantityChange: (newQuantity: number, price: number) => void;
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [curPrice, setCurPrice] = useState(item.book.price);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const onAddQuantity = () => {
    setQuantity(quantity + 1);
    onQuantityChange(quantity + 1, item.book.price);
    setCurPrice(quantity * item.book.price + item.book.price);
  };

  const onRemoveQuantity = () => {
    setQuantity(quantity - 1);
    onQuantityChange(quantity - 1, item.book.price);
    setCurPrice(quantity * item.book.price - item.book.price);
  };

  const deleteItem = () => {
    cartApi
      .deleteCartItem(item.id)
      .then((response) => {
        toastSuccess("Delete success!");
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="item w-full h-auto flex bg-white p-3 ">
        <img className="w-1/5 h-1/5" src={item.book?.thumbnailUrl} alt="" />
        <div className="info buttons flex-grow items-start text-left mt-4 pl-4">
          <a
            href={PATHS.BOOK + "/" + item.book.id}
            className="font-md text-lg hover:underline"
          >
            {item.book?.title}
          </a>
          <div className="buttons mt-3">
            <button
              className="focus:outline-none hover:bg-red-500 bg-red-400 rounded-md px-3 py-2"
              onClick={deleteItem}
            >
              Xóa
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-x-2 mt-4">
          <p className="font-md text-lg">
            <NumberFormat
              value={item.book?.price * item?.quantity}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" đ"}
            ></NumberFormat>
          </p>
          <div className="quantity h-auto border flex">
            <button
              className="focus:outline-none px-3"
              onClick={onRemoveQuantity}
              disabled={true}
            >
              -
            </button>
            <p className="p-2 border-l border-r text-center">{quantity}</p>
            <button className="focus:outline-none px-3" onClick={onAddQuantity} disabled={true}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
