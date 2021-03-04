import BookModel from "../../../../../types/models/BookModel";

type Info = {
    bookInfo: BookModel
}

const GeneralInfo = (info: Info) => {
    console.log(info.bookInfo.categories);
    

  return (
    <div>
      <div className="general-info flex flex-col items-start border mt-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Thông tin chi tiết</h1>
        <table className="w-full">
          <tbody className="text-left">
            <tr className="">
              <th className="py-4 pl-6 bg-gray-300 w-1/3 text-md">
                Công ty phát hành
              </th>
              <td className="pl-6">{info.bookInfo.publisher.name}</td>
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
              <td className="bg-gray-100 pl-6">{info.bookInfo.pages}</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">SKU</th>
              <td className="pl-6">{info.bookInfo.sku}</td>
            </tr>
            <tr>
              <th className="py-4 pl-6 bg-gray-300 text-md">Nhà xuất bản</th>
              <td className="bg-gray-100 pl-6">{info.bookInfo.publisher.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralInfo;
