//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
import Book from "../components/Book";
import bookApi from "../../../services/api/bookApi";
import BookModel from "../../../types/models/BookModel";
import Banner from "../components/Banner";

type Category = {
  title: string;
};

const CategoryPage = (category: Category) => {
  const [listBooks, setListBooks] = useState<BookModel[]>([]);

  const fetchData = useCallback(() => {
    bookApi
      .getByCategory(category.title)
      .then((response) => {
        console.log(response.data);
        setListBooks(response.data);
        console.log(listBooks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [listBooks.count]);


  const listBooksUI = listBooks.map((book: BookModel) => {
    return (
      <div className="w-1/5 h-3/4 mt-5 ml-3" key={book.id}>
        <Book
          id={book.id}
          imageSrc={book.thumbnailUrl}
          author="Cảnh Thiên"
          title={book.title}
        ></Book>
      </div>
    );
  })

  return (
    <div>
      <Banner></Banner>
      <div className="title flex mt-8">
        <p className="font-bold text-xl">{category.title}</p>
      </div>
      <div className="list_book_container flex-wrap flex self-stretch mt-4 space-y-5 space-x-3">
        {listBooksUI}
      </div>
    </div>
  );
};

export default CategoryPage;
