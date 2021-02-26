//@ts-ignore
import React, { useState, useEffect } from "react";
//@ts-ignore
import { useParams } from "react-router-dom";
//@ts-ignore
import Slider from "react-slick";
//@ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BookModel from "../../../types/models/BookModel";
import BeautyStars from "beauty-stars";
import bookApi from "../../../services/api/bookApi";
import { toastSuccess, toastError } from "../../../services/toastService";
import Book from "../../Home/components/Book";
import b1 from "../../../assets/b1.jpg";
import PrevArrow from "./components/PrevArrow";
import NextArrow from "./components/NextArrow";

const sliderOptions = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 5,
  className: "",
  prevArrow: <PrevArrow></PrevArrow>,
  nextArrow: <NextArrow></NextArrow>,
};

const DetailBookPage = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [book, setBook] = useState<BookModel>({
    id: "",
    publisher: {
      name: "",
    },
    author: {
      name: "",
    },
  });
  const { bookId } = useParams();

  const getBook = () => {
    bookApi
      .getById(bookId)
      .then((response) => {
        console.log(bookId);
        console.log(response.data);
        setBook(response.data);
        console.log(book);
        toastSuccess("Load Book Success!");
      })
      .catch((error) => {
        console.log(error);
        toastError("Load book failed!");
      });
  };

  useEffect(() => {
    getBook();
  }, [book.id]);

  return (
    <div className="my-9 h-screen">
      <div className="info flex w-full border bg-white">
        <div className="image w-1/3 h-1/2 p-4">
          <img
            src={book.thumbnailUrl}
            alt="Book Thumbnail"
            className="w-full h-full"
          />
        </div>
        <div className="info border-l p-4 flex-grow space-y-6 flex flex-col items-start rounded ">
          <h1 className="text-3xl mb-2">{book.title}</h1>
          <BeautyStars value={book.avgRating}></BeautyStars>
          <div className="price bg-gray-200 p-2 w-full flex flex-col items-start border-t">
            <h3 className="font-bold text-2xl">
              {book.price} <u>đ</u>
            </h3>
            <p className="font-bold text-red-700">Rẻ hơn hoàn tiền</p>
          </div>
          <p className="text-lg">Số lượng</p>
          <div className="form-input border">
            <button
              className="focus:outline-none px-3"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity == 0 ? true : false}
            >
              -
            </button>
            <input
              type="text"
              className="focus: outline-none border-l border-r text-center"
              value={quantity}
              size={2}
            ></input>
            <button
              className="focus:outline-none px-3"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          <button className="bg-red-500 hover:bg-red-600 px-12 py-2 rounded-md text-white font-bold w-1/2">
            Chọn mua
          </button>
        </div>
        <div className="w-1/4"></div>
      </div>
      <div className="general-info flex flex-col items-start border mt-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Thông tin chi tiết</h1>
        <table className="w-full">
          <tbody className="text-left">
            <tr className="">
              <th className="py-4 pl-6 bg-gray-300 w-1/3 text-md">
                Công ty phát hành
              </th>
              <td className="pl-6">{book.publisher.name}</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">Kích thước</th>
              <td className="bg-gray-100 pl-6">14.5 x 20.5 cm</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">Loại bìa</th>
              <td className="pl-6">Bìa mềm</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">Số trang</th>
              <td className="bg-gray-100 pl-6">{book.pages}</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">SKU</th>
              <td className="pl-6">{book.sku}</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">Nhà xuất bản</th>
              <td className="bg-gray-100 pl-6">{book.publisher.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="related-items flex flex-col items-start border mt-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Các sản phẩm liên quan</h1>
        <div className="slider z-20 w-full bg-gray-200">
          <Slider {...sliderOptions}>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
            <div>
              <Book
                id=""
                imageSrc={b1}
                author="John Gray"
                title="Đàn ông sao hỏa đàn bà sao kim"
              ></Book>
            </div>
          </Slider>
        </div>
      </div>
      <div className="description flex flex-col items-start border mt-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Mô tả sản phẩm</h1>
        <p>{book.description}</p>
        <CKEditor
          editor={ClassicEditor}
          data="<p>
          Với tập truyện ngắn
          <strong>
              Em Có Hay Trời Buồn Trời Chuyển Mưa Đó Không?
          </strong>
          một lần nữa chúng ta lại thấy Vũ Thành Sơn tiếp tục đi trên con đường riêng mình khai phá, không lẫn vào đâu.
      </p>
      <p>
          Qua từng trang viết tác giả cho ta thấy cuộc sống là vô vị, đều đều, không phi lý cũng không hữu lý, nó là không dưng
          (gratuit), là có đó, là trung tính, là một hiện thực tẻ ngắt mà chúng ta phải chung đụng hằng ngày.
      </p>
      <p>
          Tác giả không cần phải dùng đến sự tưởng tượng để khám phá nội tâm nhân vật – có vẻ như tất cả chất liệu có thể làm
          nên văn chương hư cấu nằm ở phương diện biểu hiện khách quan của mỗi người.
      </p>
      <p>
          Vũ Thành Sơn… kéo những độc giả bình tĩnh khác ở lại, đọc, rồi trầm tư với câu hỏi: “Bí mật của nhà văn là gì khi với một
          câu chuyện không gay cấn kịch tính như thông thường nhưng nó làm ta khoái cảm khi đọc, và muốn đọc lần nữa ngay khi truyện
          kết thúc?”
      </p>"
        />
      </div>
      <div className="comment-section flex flex-col items-start border my-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Khách hàng nhận xét</h1>
        <div className="comment-list w-full">
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/1077/1077114.svg?token=exp=1614223432~hmac=0ad5992b9c3fbf42a81feadd9a78cbbc"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="name-date flex flex-col items-start gap-y-1">
                <p className="text-lg">Phạm Trung Trường</p>
                <p>Nhận xét vào ngày 31 tháng 12, 2020</p>
              </div>
            </div>
            <div className="content">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis accusantium laborum tenetur porro laudantium
                praesentium omnis doloremque vel at nihil.
              </p>
            </div>
          </div>
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/1077/1077114.svg?token=exp=1614223432~hmac=0ad5992b9c3fbf42a81feadd9a78cbbc"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="name-date flex flex-col items-start gap-y-1">
                <p>Username</p>
                <p>Nhận xét vào ngày 31 tháng 12, 2020</p>
              </div>
            </div>
            <div className="content">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis accusantium laborum tenetur porro laudantium
                praesentium omnis doloremque vel at nihil.
              </p>
            </div>
          </div>
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/1077/1077114.svg?token=exp=1614223432~hmac=0ad5992b9c3fbf42a81feadd9a78cbbc"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="name-date flex flex-col items-start gap-y-1">
                <p>Username</p>
                <p>Nhận xét vào ngày 31 tháng 12, 2020</p>
              </div>
            </div>
            <div className="content">
              <p className="text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis accusantium laborum tenetur porro laudantium
                praesentium omnis doloremque vel at nihil.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ask-section flex flex-col items-start border my-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Hỏi đáp về sản phẩm</h1>
        <div className="input flex w-full gap-x-4">
          <input
            className="flex-grow focus:ring-2 focus:outline-none rounded-md p-4 border shadow-xl"
            type="text"
            placeholder="Hãy đặt câu hỏi về sản phẩm"
          />
          <button className="bg-yellow-500 rounded-md p-4 hover:bg-yellow-400">
            Gửi câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBookPage;
