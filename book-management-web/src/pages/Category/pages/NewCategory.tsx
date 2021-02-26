//@ts-ignore
import { useForm } from "react-hook-form";
import categoryApi from "../../../services/api/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import NewCategoryFormData from "../../../types/form/NewCategoryFormData";
import { toastError, toastSuccess } from "../../../services/toastService";

const NewCategory = () => {
  const { register, handleSubmit } = useForm<NewCategoryFormData>({
    mode: "onChange",
  });

  const onSubmit = (formData: NewCategoryFormData) => {
    console.log(formData);

    categoryApi
      .addNewCategory(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Create new category success!");
        }
      })
      .catch((errors) => {
        toastError("Create new category failed");
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
            Name
          </label>
          <span>
            <input
              ref={register({ required: true })}
              type="text"
              placeholder="Insert Name here"
              name="title"
              className="focus:outline-none flex-grow"
            />
          </span>
        </div>
        <div className="form-group flex gap-2">
          <label htmlFor="description" className="font-bold text-gray-500">
            Details
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
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded-lg p-2 text-white font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
