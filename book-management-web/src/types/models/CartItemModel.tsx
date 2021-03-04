import BookModel from "./BookModel";

type CartItemModel = {
  id: string;
  userId: string;
  bookId: string;
  quantity: number;
};

export default CartItemModel;
