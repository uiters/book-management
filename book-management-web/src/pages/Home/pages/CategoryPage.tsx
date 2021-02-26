//@ts-ignore
import React, { useState, useEffect, useCallback } from "react";
import Book from "../components/Book";
import b6 from "../../../assets/b6.jpg";
import bookApi from "../../../services/api/bookApi";
import BookModel from "../../../types/models/BookModel";
import Banner from "../components/Banner";

type Category = {
  title: string;
};

const CategoryPage = (category: Category) => {
  const datas = [];
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

  datas.push(
    <div className="w-1/4 h-3/4" key={1}>
      <Book
        imageSrc="https://salt.tikicdn.com/cache/w444/ts/product/eb/62/6b/0e56b45bddc01b57277484865818ab9b.jpg"
        author="Cảnh Thiên"
        title="Đừng lựa chọn an nhàn khi còn trẻ"
      ></Book>
    </div>
  );

  listBooks.forEach((book: BookModel) => {
    datas.push(
      <div className="w-1/5 h-3/4" key={book.id}>
        <Book
          imageSrc={book.thumbnailUrl}
          author="Cảnh Thiên"
          title={book.title}
        ></Book>
      </div>
    );
  });

  return (
    <div>
      <Banner></Banner>
      <div className="title flex mt-8">
        <p className="font-bold text-xl">{category.title}</p>
      </div>
      <div className="list_book_container flex-wrap flex self-stretch mt-4 space-y-5 space-x-3">
        {/* {listBooks.map((book: BookModel) => {
          <div className="w-1/4 h-3/4" key={book.id}>
            <Book
              imageSrc={book.thumbnailUrl}
              author="Cảnh Thiên"
              title={book.title}
            ></Book>
          </div>;
        })} */}
        {datas}
      </div>
    </div>
  );
};

export default CategoryPage;
