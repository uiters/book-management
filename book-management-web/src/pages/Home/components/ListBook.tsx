import b1 from "../../../assets/b1.jpg";
import b2 from "../../..//assets/b2.jpg";
import b3 from "../../../assets/b3.jpg";
import b4 from "../../../assets/b4.jpg";
import b5 from "../../../assets/b5.jpg";
import b6 from "../../../assets/b6.jpg";
import Book from "./Book";

type ListInfo = {
  title: string;
  category: string;
};

const ListBook = (info: ListInfo) => {
  return (
    <div className="bg-white p-4">
      <div className="popular-section mt-8 flex">
        <div className="popular flex items-start">
          <p className="font-bold text-2xl">{info.title}</p>
        </div>
        <div className="view-all-btn flex-grow flex justify-end">
          <a
            href={info.category}
            className="font-bold text-lg text-gray-300 focus:outline-none"
          >
            View all
          </a>
        </div>
      </div>

      <div className="popular-list mt-8 flex space-x-3">
        <Book
          id=""
          imageSrc={b1}
          author="John Gray"
          title="Đàn ông sao hỏa đàn bà sao kim"
        ></Book>
        <Book id="" imageSrc={b2} author="Minh Niệm" title="Hiểu về trái tim"></Book>
        <Book
          id=""
          imageSrc={b3}
          author="John Gray"
          title="Tôi quyết định sống cho chính tôi"
        ></Book>
        <Book id="" imageSrc={b4} author="Diệp Tu" title="Tư duy sâu"></Book>
        <Book
          id=""
          imageSrc={b5}
          author="Bill Burnett"
          title="Thiết kế một cuộc đời đáng sống"
        ></Book>
        <Book
          id=""
          imageSrc={b6}
          author="Cảnh Thiên"
          title="Đừng lựa chọn an nhàn khi còn trẻ"
        ></Book>
      </div>
    </div>
  );
};

export default ListBook;
