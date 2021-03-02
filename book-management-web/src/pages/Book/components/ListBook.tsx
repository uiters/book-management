//@ts-ignore
import Slider from "react-slick";
//@ts-ignore
import React, { useState, useEffect } from "react";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import BookModel from "../../../types/models/BookModel";
import bookApi from "../../../services/api/bookApi";
import Book from "../../Home/components/Book";

type ListInfo = {
  category: string;
  title: string;
  link: string;
};

const sliderOptions = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoPlay: true,
  autoplaySpeed: 2000,
  className: "ountline-none h-auto",
  prevArrow: <PrevArrow></PrevArrow>,
  nextArrow: <NextArrow></NextArrow>,
};

const ListBook = (info: ListInfo) => {
  const [listBook, setListBook] = useState<BookModel[]>([]);

  useEffect(() => {
    let isMounted = true;
    bookApi
      .getByCategory(info.category)
      .then((response) => {
        console.log(response.data);
        if (isMounted) {
          setListBook(response.data);
        }
        console.log(listBook);
      })
      .catch((errors) => {
        console.log(errors);
      });

    return () => {
      isMounted = false;
    };
  }, [listBook.count]);

  const listUI = listBook.map((book: BookModel) => {
    return (
      <div className="min-h-full" key={book.id}>
        <Book
          id={book.id}
          imageSrc={book.thumbnailUrl}
          author={book.author.name}
          title={book.title}
        ></Book>
      </div>
    );
  });

  return (
    <div>
      <div className="related-items  items-start border mt-8 p-4 gap-y-5 bg-white">
        <div className="popular-section flex mt-8">
          <div className="popular flex items-start">
            <p className="font-bold text-2xl">{info.title}</p>
          </div>
          <div className="view-all-btn flex-grow flex">
            <a
              href={info.link}
              className="font-bold text-lg text-gray-300 focus:outline-none ml-auto"
            >
              View all
            </a>
          </div>
        </div>

        <div className="slider z-20 w-full bg-gray-200">
          <Slider {...sliderOptions}>{listUI}</Slider>
        </div>
      </div>
    </div>
  );
};

export default ListBook;
