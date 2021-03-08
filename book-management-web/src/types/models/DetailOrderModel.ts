import CartItemViewModel from "./CartItemViewModel";

type DetailOrderModel = {
    totalPrice: number;
    orderItems: CartItemViewModel[];
}

export default DetailOrderModel;