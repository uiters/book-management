import BookModel from "./BookModel";

type CartItemViewModel = {
    id: string;
    book: BookModel;
    quantity: number;
}

export default CartItemViewModel;