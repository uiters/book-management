//@ts-ignore
import React, { useState, useCallback, useEffect } from "react";
//@ts-ignore
import { EventHandler } from "react";
//@ts-ignore
import { useHistory } from "react-router-dom";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import NumberFormat from "react-number-format";
import codPic from "../../../../assets/cod.png";
import debitCardPic from "../../../../assets/debit-card.png";
import cartApi from "../../../../services/api/cartApi";
import CartModel from "../../../../types/models/CartModel";
import User from "../../../../types/models/UserModel";
import CartItemViewModel from "../../../../types/models/CartItemViewModel";
import OrderItem from "../../../Order/pages/detail/components/OrderItem";
import add from "date-fns/add";
import OrderModel from "../../../../types/models/OrderModel";
import orderApi from "../../../../services/api/orderApi";
import { toastError, toastSuccess } from "../../../../services/toastService";
import { PATHS } from "../../../../constants/paths";

const CartCheckoutPage = () => {
  const [delivery, setDelivery] = useState("1");
  const [payment, setPayment] = useState("1");
  const [shippingFee, setShippingFee] = useState(100000);
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const history = useHistory();
  const [cart, setCart] = useState<CartModel>({
    cartItems: [],
    totalPrice: 0,
  });

  const handleDeliveryChange = (event: EventHandler) => {
    setDelivery(event.target.value);
    const deliveryOption = event.target.value;

    if (deliveryOption === "1") {
      setShippingFee(100000);
      setDeliveryDate(add(new Date(), { hours: 4 }));
    } else if (deliveryOption === "2") {
      setShippingFee(80000);
      setDeliveryDate(add(new Date(), { hours: 8 }));
    } else {
      setShippingFee(50000);
      setDeliveryDate(add(new Date(), { days: 7 }));
    }
  };

  const handlePaymentChange = (event: EventHandler) => {
    setPayment(event.target.value);
  };

  const getCart = useCallback(async (userId: string) => {
    const response1 = await cartApi.getCart(userId);
    setCart(response1.data);
  });

  useEffect(() => {
    if (user.id !== null) {
      getCart(user.id);
    }
  }, [cart.cartItems.count]);

  const listCartItems = cart.cartItems.map((item: CartItemViewModel) => {
    return <OrderItem key={item.id} item={item}></OrderItem>;
  });

  const onCheckoutClick = () => {
    const order: OrderModel = {
      userId: user.id,
      shippingFee: shippingFee,
      deliveryDate: deliveryDate,
      deliveryOption: parseInt(delivery),
      paymentMethod: parseInt(payment),
      createdAt: new Date(),
      totalPrice: cart.totalPrice + shippingFee,
      status: 1,
      id: "",
    };
    console.log(order);

    orderApi
      .createOrder(order)
      .then((response) => {
        console.log(response.data);

        if (response.status === 200) {
          toastSuccess("Create order successfull!");
          history.push(PATHS.ORDER + "/" + response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);

        toastError(error.response.data.message);
      });
  };

  return (
    <div className="mt-4">
      <h1 className="font-semibold text-3xl">Checkout</h1>
      <div className="container flex w-full mt-6 space-x-3">
        <div className="checkout-detail flex-grow w-full flex flex-col items-start space-y-2">
          <div className="cart-items w-full space-y-3">
            <p className="font-bold text-gray-600 text-xl text-left">
              1. Cart Items
            </p>
            {listCartItems}
          </div>
          <div className="delivery-method w-full space-y-3">
            <p className="font-bold text-gray-600 text-xl text-left">
              2. Choose delivery method
            </p>
            <div className="radio-input border w-full bg-white rounded-lg">
              <RadioGroup
                className="p-4"
                aria-label="gender"
                name="gender1"
                value={delivery}
                onChange={handleDeliveryChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Delivered in 3-4 H"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Delivered in day"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Standard Delivery"
                />
              </RadioGroup>
            </div>
          </div>
          <div className="payment-method w-full space-y-3 pb-8">
            <p className="font-bold text-gray-600 text-xl text-left">
              3. Choose payment method
            </p>
            <div className="payment bg-white rounded-lg">
              <RadioGroup
                className="p-4"
                aria-label="gender"
                name="payment"
                value={payment}
                onChange={handlePaymentChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-x-3">
                      <img src={codPic} className="w-8 h-8" alt="" />
                      <p>Cash on delivery</p>
                    </div>
                  }
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-x-3">
                      <img src={debitCardPic} className="w-8 h-8" alt="" />
                      <p>Mastercard / Visa</p>
                    </div>
                  }
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="detail-info w-1/3 space-y-3 mt-10">
          <div className="user-info bg-white w-full flex flex-col items-start p-3">
            <span className="text-left font-bold text-lg mb-3">Address</span>
            <span>
              {user?.name} | {user?.email}
            </span>
            <span>{user?.address}</span>
          </div>
          <div className="delivery-info bg-white w-full flex flex-col items-start p-3">
            <span className="text-left font-bold text-lg mb-3">
              Delivery Date
            </span>
            <span>
              {new Intl.DateTimeFormat("vn-VN", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
              }).format(deliveryDate)}
            </span>
            <p></p>
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
            <div className="tempPrice border border-t-0 border-l-0 border-r-0 p-3 w-full ">
              <span className="text-left font-bold text-lg mb-3 float-left">
                Shipping Fee
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
                Total Price
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
              onClick={onCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutPage;
