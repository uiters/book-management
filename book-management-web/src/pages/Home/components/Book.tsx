import React from "react";
import { PATHS } from "../../../constants/paths";

type BookData = {
  imageSrc: string;
  title: string;
  author: string;
};

const Book = (book: BookData) => {
  return (
    <div className="book hover:shadow-xl bg-white p-2">
      <a href={PATHS.DETAILS} className="w-auto h-auto m-1 p-3">
        <img src={book.imageSrc} alt="" className="object-fill border-0" />
        <p className="text-lg max-h-14 h-14 mb-4">{book.title}</p>
        <div className="mt-6">
          <p className="font-bold text-lg text-gray-400">
            {book.author}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Book;
