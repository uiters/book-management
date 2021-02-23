import React from "react";

type BookData = {
  imageSrc: string;
  title: string;
  author: string;
};

const Book = (book: BookData) => {
  return (
    <div className="book hover:shadow-xl">
      <a href="/category" className="w-auto h-auto m-1">
        <img src={book.imageSrc} alt="" className="object-fill border-0" />
        <p className="font-bold text-xl max-h-14 h-14 mb-4">{book.title}</p>
        <div className="">
          <p className="font-bold text-lg text-gray-400">
            {book.author}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Book;
