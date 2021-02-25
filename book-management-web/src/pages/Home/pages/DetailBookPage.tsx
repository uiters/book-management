//@ts-ignore
import React, { useState } from "react";
import BookModel from "../../../types/models/BookModel";
import BeautyStars from "beauty-stars";

const DetailBookPage = () => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div className="my-9 h-screen">
      <div className="info flex w-full border bg-white">
        <div className="image w-1/3 h-1/2 p-4">
          <img
            src="https://salt.tikicdn.com/cache/280x280/ts/product/90/7b/0e/68401d4ae03050405e670e100e8617fb.png"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="info border-l p-4 flex-grow space-y-6 flex flex-col items-start rounded ">
          <h1 className="text-3xl mb-2">Mãi mãi là bao xa (Tái bản 2019)</h1>
          <BeautyStars value={3}></BeautyStars>
          <div className="price bg-gray-200 p-2 w-full flex flex-col items-start border-t">
            <h3 className="font-bold text-2xl">
              100.000 <u>đ</u>
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
              <td className="pl-6">BIZBOOKS</td>
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
              <td className="bg-gray-100 pl-6">488</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">SKU</th>
              <td className="pl-6">2588080957028</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">Nhà xuất bản</th>
              <td className="bg-gray-100 pl-6">Nhà Xuất Bản Hồng Đức</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="description flex flex-col items-start border mt-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Mô tả sản phẩm</h1>
        <p>
          “Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra
          những điều khiến cuộc đời này đáng số một tác phẩm kinh điển của
          Brazil.”\n- Booklist\n“Một cách nhìn cuộc sống gần như hoàn chỉnh...
        </p>
      </div>
      <div className="comment-section flex flex-col items-start border my-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Khách hàng nhận xét</h1>
        <div className="comment-list w-full">
          <div className="comment mt-4 border-t pt-6">
            <div className="user-info flex gap-x-4 mb-2">
              <img
                src="https://www.flaticon.com/svg/vstatic/svg/709/709579.svg?token=exp=1614162892~hmac=d61477c0b827701c718f7753aeddb0b6"
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
                src="https://www.flaticon.com/svg/vstatic/svg/709/709579.svg?token=exp=1614162892~hmac=d61477c0b827701c718f7753aeddb0b6"
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
                src="https://www.flaticon.com/svg/vstatic/svg/709/709579.svg?token=exp=1614162892~hmac=d61477c0b827701c718f7753aeddb0b6"
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
