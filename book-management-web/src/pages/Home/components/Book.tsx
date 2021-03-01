import React from "react";
import { PATHS } from "../../../constants/paths";

type BookData = {
  id: string;
  imageSrc: string;
  title: string;
  author: string;
};

const Book = (book: BookData) => {
  return (
    <div className="hover:shadow-xl hover:bg-gray-200 bg-white p-2 w-auto">
      <a href={ '/book/' + book.id} className="w-auto h-auto m-1 p-3">
        <img src={book.imageSrc} alt="" className="object-fill border-0" />
        <p className="text-lg max-h-14 h-14 my-4">{book.title}</p>
        <div className="mt-6">
          <p className="font-bold text-lg text-gray-500">
            {book.author}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Book;
