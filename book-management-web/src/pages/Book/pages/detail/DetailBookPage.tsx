//@ts-ignore
import React, { useState, useEffect } from "react";
//@ts-ignore
import { useParams } from "react-router-dom";
import BookModel from "../../../../types/models/BookModel";
import BeautyStars from "beauty-stars";
import bookApi from "../../../../services/api/bookApi";
import { toastSuccess, toastError } from "../../../../services/toastService";
import PrevArrow from "../../components/PrevArrow";
import NextArrow from "../../components/NextArrow";
import ListBook from "../../components/ListBook";
import DescriptionEditor from "./components/DescriptionEditor";
import CommentSection from "./components/CommentSection";
import AskSection from "./components/AskSection";
import GeneralInfo from "./components/GeneralInfo";
import { PATHS } from "../../../../constants/paths";
import Photo from "../../../../types/models/Photo";
import CartItemModel from "../../../../types/models/CartItemModel";
import cartApi from "../../../../services/api/cartApi";
import User from "../../../../types/models/UserModel";
import NumberFormat from "react-number-format";
import DetailBookModel from "../../../../types/models/DetailBookModel";
import RelatedBooks from "./components/RelatedBooks";

const sliderOptions = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 5,
  className: "outline-none",
  prevArrow: <PrevArrow></PrevArrow>,
  nextArrow: <NextArrow></NextArrow>,
};

const DetailBookPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  let imageUrls: string[] = [];
  const { bookId } = useParams();
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const [isMounted, setIsMounted] = useState(false);
  const [detailData, setDetailData] = useState<DetailBookModel>({
    book: {
      id: "",
      publisher: {
        name: "",
      },
      author: {
        id: "",
        name: "",
      },
      categories: [],
    },
    relatedBooks: [],
  });
  const [book, setBook] = useState<BookModel>({
    id: "",
    publisher: {
      name: "",
    },
    author: {
      id: "",
      name: "",
    },
    categories: [],
  });

  const getBook = () => {
    bookApi
      .getDetailBookData(bookId)
      .then((response) => {
        console.log(response.data);

        setDetailData(response.data);
      })
      .catch((error) => {
        console.log(error);

        toastError("Load book failed!");
      });
  };

  const onAddToCartClick = () => {
    const cartItem: CartItemModel = {
      bookId: bookId,
      userId: user.id,
      quantity: quantity,
      id: "",
    };

    cartApi
      .addCartItem(cartItem)
      .then((response) => {
        toastSuccess("Add new item to cart success!");
        console.log(response.data);
      })
      .catch((error) => {
        toastError("Add new item to cart failed!");
        console.log(error);
      });
  };

  useEffect(() => {
    getBook();
    return () => {
      setIsMounted(false);
    };
  }, [book.id]);

  return (
    <div className="my-9 h-screen">
      <div className="info flex w-full border bg-white">
        <div className="image w-1/3 h-1/2 p-4">
          <img
            src={detailData.book.thumbnailUrl}
            alt="Book Thumbnail"
            className="w-full h-full"
          />
        </div>
        <div className="info border-l p-4 flex-grow space-y-6 flex flex-col items-start rounded ">
          <h1 className="text-3xl mb-2">{detailData.book.title}</h1>
          {/* <BeautyStars value={book.avgRating}></BeautyStars> */}
          <div className="price rounded-md p-2 w-full flex flex-col items-start border-t bg-gradient-to-r from-pink-600 to-yellow-500">
            <h3 className="font-bold text-white text-2xl hover:underline">
              <NumberFormat
                value={detailData.book.price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" đ"}
              ></NumberFormat>
            </h3>
            <p className="font-bold text-white">
              Còn lại: {detailData.book.quantity}
            </p>
            <p className="font-bold text-white">Rẻ hơn hoàn tiền</p>
          </div>
          <p className="text-lg">Số lượng</p>
          <div className="form-input border">
            <button
              className="focus:outline-none px-3"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity == 1 ? true : false}
            >
              -
            </button>
            <input
              type="text"
              className="focus: outline-none border-l border-r text-center"
              value={quantity}
              size={2}
              readOnly
            ></input>
            <button
              className="focus:outline-none px-3"
              onClick={() => {
                if (quantity === detailData.book.quantity) return;
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 px-12 py-2 rounded-md text-white font-bold w-1/2"
            onClick={onAddToCartClick}
          >
            Chọn mua
          </button>
        </div>
      </div>
      <GeneralInfo bookInfo={detailData.book}></GeneralInfo>
      <RelatedBooks
        title="Các sản phẩm liên quan"
        category={detailData.book.categories[0]?.name}
        link={detailData.book.categories[0]?.slug}
        books={detailData.relatedBooks}
      ></RelatedBooks>
      <DescriptionEditor></DescriptionEditor>
      <CommentSection></CommentSection>
      <AskSection></AskSection>
    </div>
  );
};

export default DetailBookPage;
