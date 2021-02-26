import AuthorModel from "./AuthorModel";
import PublisherModel from "./PublisherModel";

type BookModel = {
  id: string;
  title: string;
  price: number;
  description: string;
  avgRating: number;
  page: number;
  thumbnailUrl: string;
  sku: string;
  author: AuthorModel;
  publisher: PublisherModel;
};

export default BookModel;
