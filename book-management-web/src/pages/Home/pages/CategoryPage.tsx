//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
import Book from "../components/Book";
import b6 from "../../../assets/b6.jpg";
import bookApi from "../../../services/api/bookApi";
import BookModel from "../../../types/models/BookModel";

type Category = {
  title: string;
};

const CategoryPage = (category: Category) => {
  const datas = [];
  const [listBooks, setListBooks] = useState<BookModel[]>([]);

  const fetchData = useCallback(() => {
    bookApi
      .getByCategory(category.title)
      .then((repsonse) => setListBooks(repsonse.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [listBooks.count]);

  for (var i = 0; i < 10; i++) {
    datas.push(
      <div className="w-1/5 h-3/4" key={i}>
        <Book
          imageSrc={b6}
          author="Cảnh Thiên"
          title="Đừng lựa chọn an nhàn khi còn trẻ"
        ></Book>
      </div>
    );
  }

  listBooks.forEach((book: BookModel) => {
    datas.push(
      <div className="w-1/5 h-3/4" key={book.id}>
        <Book imageSrc={b6} author="Cảnh Thiên" title={book.title}></Book>
      </div>
    );
  });

  return (
    <div>
      <div className="title flex mt-8">
        <p className="font-bold text-xl">{category.title}</p>
      </div>
      <div className="list_book_container flex-wrap flex self-stretch mt-4">
        {datas}
      </div>
    </div>
  );
};

export default CategoryPage;
