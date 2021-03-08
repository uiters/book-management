//@ts-ignore
import Slider from "react-slick";
//@ts-ignore
import React, {  } from "react";
import PrevArrow from "../../../components/PrevArrow";
import NextArrow from "../../../components/NextArrow";
import BookModel from "../../../../../types/models/BookModel";
import Book from "../../../../Home/components/Book";

type ListInfo = {
  category: string;
  title: string;
  link: string;
  books: BookModel[];
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

const RelatedBooks = (info: ListInfo) => {
  const listUI = info.books?.map((book: BookModel) => {
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
              href={"/" + info.link}
              className="font-bold text-lg text-gray-300 focus:outline-none ml-auto"
            >
              View all
            </a>
          </div>
        </div>
        <div className="slider z-20 w-full">
          <Slider {...sliderOptions}>{listUI}</Slider>
        </div>
      </div>
    </div>
  );
};

export default RelatedBooks;
