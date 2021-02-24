//@ts-ignore
import { useForm } from "react-hook-form";
import bookApi from "../../../services/api/bookApi";
import { ToastContainer, toast } from "react-toastify";
import NewBookFormData from "../../../types/form/NewBookFormData";
import { toastError, toastSuccess } from "../../../services/toastService";

const NewBookPage = () => {
  const { register, handleSubmit } = useForm<NewBookFormData>({
    mode: "onChange",
  });

  const onSubmit = (formData: NewBookFormData) => {
    console.log(formData);

    bookApi
      .addNewBook(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Create new book success!");
        }
      })
      .catch((errors) => {
        toastError("Create new book failed");
      });
  };
  return (
    <div className="flex flex-col border border-gray-500 w-1/3 text-center items-center bg-white mx-auto my-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 m-6"
      >
        <div className="form-group flex gap-2">
          <label htmlFor="title" className="font-bold text-gray-500">
            Title:
          </label>
          <span>
            <input
              ref={register({ required: true })}
              type="text"
              placeholder="Insert Title here"
              name="title"
              className="focus:outline-none flex-grow"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="description" className="font-bold text-gray-500">
            Description:
          </label>
          <span>
            <textarea
              placeholder="Insert Description here"
              defaultValue=""
              ref={register}
              name="description"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="price" className="font-bold text-gray-500">
            Price:
          </label>
          <span>
            <input
              type="text"
              placeholder="Insert Price here"
              defaultValue="1000000"
              ref={register}
              name="price"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="pages" className="font-bold text-gray-500">
            Pages:
          </label>
          <span>
            <input
              type="text"
              placeholder="Insert Pages here"
              defaultValue="300"
              ref={register}
              name="pages"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="sku" className="font-bold text-gray-500">
            SKU:
          </label>
          <span>
            <input
              type="text"
              placeholder="Insert SKU here"
              defaultValue="SKUXXXXXXXX"
              ref={register}
              name="sku"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="authorName" className="font-bold text-gray-500">
            Author' Name:
          </label>
          <span>
            <input
              type="text"
              placeholder="Insert SKU here"
              defaultValue=""
              ref={register}
              name="authorName"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="publisherName" className="font-bold text-gray-500">
            Publisher's Name:
          </label>
          <span>
            <input
              type="text"
              placeholder="Insert SKU here"
              defaultValue=""
              ref={register}
              name="publisherName"
            />
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded-lg p-2 text-white font-bold"
        >
          Submit Book
        </button>
      </form>
    </div>
  );
};

export default NewBookPage;
