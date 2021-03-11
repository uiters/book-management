import AuthorModel from "../models/AuthorModel";
import CategoryModel from "../models/CategoryModel";
import PublisherModel from "../models/PublisherModel";

type NewBookInputData = {
  authors: AuthorModel[];
  publishers: PublisherModel[];
  cateogries: CategoryModel[];
};

export default NewBookInputData;
