//@ts-ignore
import { useState, useEffect } from "react";
//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useParams } from "react-router-dom";
import categoryApi from "../../../services/api/categoryApi";
import { toastSuccess, toastError } from "../../../services/toastService";
import NewCategoryFormData from "../../../types/form/NewCategoryFormData";
import CategoryModel from "../../../types/models/CategoryModel";
import { PATHS } from "../../../constants/paths";

type idCategory = {
  id: string;
};

const UpdateCategory = () => {

  const history = useHistory();
  const [category, setCategory] = useState<CategoryModel>();
  const { categoryId } = useParams();
  const [isLoading, setLoading] = useState<Boolean>(false);

  const getCategory = () => {
    categoryApi
      .getById(categoryId)
      .then((response) => {
        console.log(categoryId);
        console.log(response.data);
        setCategory(response.data);
        setLoading(true);
        toastSuccess("Load Category Success!");
      })
      .catch((error) => {
        console.log(error);
        toastError("Load Category failed!");
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onSubmit = (formData: NewCategoryFormData) => {
    console.log(formData);
    categoryApi
      .updateCategory(categoryId, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess(res.data);
          history.push("/category");
        }
      })
      .catch((errors) => {
        toastError(errors.response.data.message);
      });
  };

  const { register, handleSubmit, errors } = useForm<NewCategoryFormData>({
    mode: "onChange",
    revalidateModel: "onChange",
    defaultValues: {
      "Name": category?.name,
      "Details": category?.details
    }
  });

  if (isLoading === false) {
    return <div></div>;
  }

  return (
    // <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
    //     <div className="max-w-md w-full mx-auto">
    //         <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
    //             Update Category Form
    // </div>
    //     </div>
    //     <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
    //         <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //             <div>
    //                 <label htmlFor="" className="text-sm font-bold text-gray-600 block">
    //                     Name
    //     </label>
    //                 <input
    //                     ref={register()}
    //                     // style={{borderColor: errors.name ? "red":""}}
    //                     // ref={register()}
    //                     defaultValue={category.name}
    //                     name="Name"
    //                     type="text"
    //                     className="w-full p-2 border border-gray-300 rounded mt-1"
    //                 />
    //                 {/* {errors.name && "Username is invalid"} */}
    //             </div>

    //             <div>
    //                 <label htmlFor="" className="text-sm font-bold text-gray-600 block">
    //                     Details
    //     </label>
    //                 <input
    //                     ref={register({ required: true })}
    //                     defaultValue={category.details}
    //                     name="Details"
    //                     type="text"
    //                     className="w-full p-2 border border-gray-300 rounded mt-1"
    //                 />
    //             </div>
    //             <div>
    //                 <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
    //                     Submit
    //     </button>
    //             </div>
    //         </form>
    //     </div>
    // </div>

    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">Update Category Page</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6 w-full p-5"
      >
        <div className="form-group flex flex-col items-start">
          <label htmlFor="title" className="font-bold text-gray-500 w-full text-left">
            Name:
            </label>
          <div className="w-full">

            <span className="flex-grow">
              <input
                ref={register({ required: true, maxLength: "20" })}
                type="text"
                placeholder="Insert Name here"
                name="Name"
                defaultValue={category.name}
                className="focus:outline-none w-full border"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.Name?.type == "required" && "Name is required!"}
            {errors.Name?.type == "maxLength" && "Name is max 20 chars!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start">
          <label htmlFor="description" className="font-bold text-gray-500 w-full text-left">
            Details:
            </label>
          <div className="w-full border">
            <span className="flex-grow">
              <textarea
                className="w-full focus:outline-none"
                placeholder="Insert Details here"
                defaultValue={category.details}
                ref={register({ required: "true" })}
                name="Details"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.Details?.type == "required" &&
              "Details is required!"}
          </span>
        </div>

        <div className="submit_buttons mx-auto w-full space-x-5 p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a className="w-full p-6 mr-0" href={PATHS.CATEGORY}>Cancel</a>
          </button>
          <button
            type="submit"
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 px-7 text-white font-bold w-auto"
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  );
}

export default UpdateCategory;