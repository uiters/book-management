//@ts-ignore
import React, { useState } from 'react';
//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useHistory } from "react-router-dom";
import categoryApi from "../../../services/api/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import NewCategoryFormData from "../../../types/form/NewCategoryFormData";
import { toastError, toastSuccess } from "../../../services/toastService";
import { PATHS } from "../../../constants/paths";

const NewCategory = () => {
  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm<NewCategoryFormData>({
    mode: "onChange",
    reValidateModel: "onChange",
  });

  const [isLeave, setIsLeave] = useState<Boolean>(false);

  const onSubmit = (formData: NewCategoryFormData) => {
    console.log(formData);

    categoryApi
      .addNewCategory(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess(res.data);

          if (isLeave) {
            // history.push(PATHS.BOOK + "/" + res.data);
            history.push("/category");
          } else {
            reset();
          }

        }
      })
      .catch((errors) => {
        toastError(errors.response.data.message);
      });
  };

  return (
    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">New Category Page</h1>
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
                defaultValue=""
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
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 text-white font-bold w-auto"
          >
            Submit & Reset
          </button>
          <button
            type="submit"
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 text-white font-bold w-auto"
            onClick={() => {
              setIsLeave(true);
            }}
          >
            Submit & Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
