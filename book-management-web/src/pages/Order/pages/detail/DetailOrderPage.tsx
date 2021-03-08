//@ts-ignore
import React, { useState, useEffect } from "react";
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
  });

  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    var dd = String(deliveryDate.getDate() + 2).padStart(2, '0');
    var mm = String(deliveryDate.getMonth() + 1).padStart(2, '0');
    var yyyy = deliveryDate.getFullYear();

    const date = dd + '/' + mm + '/' + yyyy;
    console.log(date);
    
    return date;
  }
  const date = getDeliveryDate();

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
          <div className="user-info bg-white text-left h-20 pl-3">
            <p className="font-bold">{user.name}</p>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <div className="shipping w-1/4 text-left">
        <p className="pl-3 text-lg font-medium mb-4">Delivery Fee</p>
          <div className="shipping-info bg-white text-left h-20 pl-3">
            <p>Delivered before: {date}</p>
          </div>
        </div>
        <div className="payment w-1/4 text-left">
        <p className="pl-3 text-lg font-medium mb-4">Payment Method</p>
          <div className="payment-method h-20 bg-white pl-3">
            <p>Cash On Delivery</p>
          </div>
        </div>
      </div>
      <div className="order-items w-11/12 space-y-4">{orderItemsUI}</div>
    </div>
  );
};

export default DetailOrderPage;
