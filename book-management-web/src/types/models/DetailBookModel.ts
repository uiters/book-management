import BookModel from "./BookModel";

type DetailBookModel = {
    book: BookModel;
    relatedBooks: BookModel[];
}

export default DetailBookModel;