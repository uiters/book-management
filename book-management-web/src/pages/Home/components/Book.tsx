import React from 'react'

type BookData = {
  imageSrc: string;
  title: string;
  author: string;
};

const Book = (book: BookData) => {
  return (
    <div className="book hover:shadow-2xl">
      <a href="/book_id" className="hover:border-4 w-auto h-auto m-2">
        <img src={book.imageSrc} alt="" className="w-auto h-auto" />
        <p className="font-bold text-xl max-h-14 h-14 mb-4">{book.title}</p>
        <a href="/abc" className="font-bold text-lg text-gray-400">
          {book.author}
        </a>
      </a>
    </div>
  );
};

export default Book;
