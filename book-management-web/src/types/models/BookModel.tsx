import AuthorModel from "./AuthorModel";
import CategoryModel from "./CategoryModel";
import Photo from "./Photo";
import PublisherModel from "./PublisherModel";

type BookModel = {
  id: string;
  title: string;
  price: number;
  description: string;
  avgRating: number;
  pages: number;
  thumbnailUrl: string;
  sku: string;
  author: AuthorModel;
  publisher: PublisherModel;
  categories: CategoryModel[];
  photos: Photo[];
};

export default BookModel;
