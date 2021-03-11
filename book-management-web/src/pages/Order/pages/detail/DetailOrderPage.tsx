//@ts-ignore
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
//@ts-ignore
import { useParams } from "react-router-dom";
import orderApi from "../../../../services/api/orderApi";
import CartItemViewModel from "../../../../types/models/CartItemViewModel";
import DetailOrderModel from "../../../../types/models/DetailOrderModel";
import User from "../../../../types/models/UserModel";
import OrderItem from "./components/OrderItem";

const DetailOrderPage = () => {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const { orderId } = useParams();
  const [detailOrder, setDetailOrder] = useState<DetailOrderModel>({
    totalPrice: 0,
    orderItems: [],
    deliveryDate: new Date(),
  });

  const getOrderDetailData = () => {
    orderApi
      .getOrderById(orderId)
      .then((response) => {
        console.log(response.data);
        setDetailOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderDetailData();
  }, [detailOrder.totalPrice]);

  const orderItemsUI = detailOrder.orderItems.map((item: CartItemViewModel) => {
    return <OrderItem item={item} key={item.id}></OrderItem>;
  });

  return (
    <div className="container mt-8">
      <div className="order-info flex flex-wrap mb-6 space-x-5 w-11/12">
        <div className="address w-1/4 text-left">
          <p className="pl-3 text-lg font-medium mb-4">User Address</p>
          <div className="user-info bg-white text-left h-20 p-3">
            <p className="font-bold">{user.name}</p>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <div className="shipping w-1/4 text-left">
          <p className="pl-3 text-lg font-medium mb-4">Delivery Fee</p>
          <div className="shipping-info bg-white text-left h-20 p-3">
            <p>Delivered before: {detailOrder.deliveryDate.toString()}</p>
          </div>
        </div>
        <div className="payment w-1/4 text-left">
          <p className="pl-3 text-lg font-medium mb-4">Payment Method</p>
          <div className="payment-method h-20 bg-white p-3">
            <p>{detailOrder.paymentMethod}</p>
          </div>
        </div>
      </div>
      <div className="order-items w-11/12 space-y-4">{orderItemsUI}</div>
      <div className="payment w-11/12 bg-white mt-6 p-3">
        <div className="approximate-price flex gap-x-3">
          <p className="float-left font-bold text-lg mb-3">
            Approximate Price:{" "}
          </p>
          <NumberFormat
            value={detailOrder.totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" đ"}
          ></NumberFormat>
        </div>
        <div className="approximate-price flex gap-x-3">
          <p className="float-left font-bold text-lg mb-3">Shipping Fee: </p>{" "}
          <NumberFormat
            value={detailOrder.shippingFee}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" đ"}
          ></NumberFormat>
        </div>
        <div className="approximate-price flex gap-x-3">
          <p className="float-left font-bold text-lg mb-3">Total Price: </p>{" "}
          <NumberFormat
            value={detailOrder.totalPrice + detailOrder.shippingFee}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" đ"}
          ></NumberFormat>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderPage;
