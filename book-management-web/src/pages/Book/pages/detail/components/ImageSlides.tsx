//@ts-ignore
import Slider from "react-slick";
import React from "react";

const sliderOptions = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoPlay: true,
  autoplaySpeed: 2000,
  className: "ountline-none h-auto",
};

type SlideInput = {
  urls: string[];
};

const ImageSlides = (prop: SlideInput) => {
  const imagesUI = prop.urls.map((url: string, index: number) => {
    return (
      <div className="w-full" key={index}>
        <img
          src={url}
          alt="Book Image"
          className="w-full h-full"
        />
      </div>
    );
  });

  return (
    <div>
      <Slider {...sliderOptions}>{imagesUI}</Slider>
    </div>
  );
};

export default ImageSlides;
