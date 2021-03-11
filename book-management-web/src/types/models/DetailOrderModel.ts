import CartItemViewModel from "./CartItemViewModel";

type DetailOrderModel = {
    totalPrice: number;
    orderItems: CartItemViewModel[];
    paymentMethod: string,
    deliveryOption: string,
    shippingFee: number,
    deliveryDate: Date,
}

export default DetailOrderModel;