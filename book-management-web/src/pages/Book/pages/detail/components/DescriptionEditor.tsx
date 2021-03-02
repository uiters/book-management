//@ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const DescriptionEditor = () => {
  return (
    <div>
      <div className="description flex flex-col items-start border mt-8 p-4 gap-y-5 bg-white">
        <h1 className="text-2xl">Mô tả sản phẩm</h1>
        <CKEditor
          editor={ClassicEditor}
          disabled="true"
          config={{
            toolbar: [],
          }}
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
    </div>
  );
};

export default DescriptionEditor;
