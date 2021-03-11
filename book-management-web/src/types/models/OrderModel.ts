type OrderModel = {
    deliveryDate: Date;
    totalPrice: number;
    createdAt: Date;
    id: string;
    shippingFee: number;
    status: number;
    deliveryOption: number;
    paymentMethod: number;
    userId: string;
}

export default OrderModel;