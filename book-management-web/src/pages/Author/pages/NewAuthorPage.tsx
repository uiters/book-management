//@ts-ignore
import React, { useState } from 'react';
//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastError, toastSuccess } from "../../../services/toastService";
import NewAuthorFormData from "../../../types/form/NewAuthorFormData";
import authorApi from "../../../services/api/authorApi";
import { PATHS } from '../../../constants/paths';

const NewAuthorPage = () => {
  const history = useHistory();

  const { register, handleSubmit,errors,reset } = useForm<NewAuthorFormData>({
    mode: "onChange",
    reValidateModel: "onChange"
  });

  const [isLeave, setIsLeave] = useState<Boolean>(false);

  const onSubmit = (formData: NewAuthorFormData) => {
    console.log(formData);

    authorApi
      .addNewAuthor(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess(res.data);

          if (isLeave) {
            history.push("/author");
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
    // <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
    //   <div className="max-w-md w-full mx-auto">
    //     {/* <div className="text-center font-medium text-xl">
    //                 something
    //             </div> */}
    //     <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
    //       Create Author Form
    //     </div>
    //   </div>
    //   <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
    //     <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //       <div>
    //         <label htmlFor="" className="text-sm font-bold text-gray-600 block">
    //           Name
    //         </label>
    //         <input
    //           ref={register()}
    //           // style={{borderColor: errors.name ? "red":""}}
    //           // ref={register()}
    //           name="Name"
    //           type="text"
    //           className="w-full p-2 border border-gray-300 rounded mt-1"
    //         />
    //         {/* {errors.name && "Username is invalid"} */}
    //       </div>

    //       <div>
    //         <label htmlFor="" className="text-sm font-bold text-gray-600 block">
    //           Description
    //         </label>
    //         <input
    //           ref={register({required: true})}
    //           name="Description"
    //           type="text"
    //           className="w-full p-2 border border-gray-300 rounded mt-1"
    //         />
    //       </div>
    //       <div>
    //         <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">New Author Page</h1>
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
              Description:
            </label>
          <div className="w-full border">
            <span className="flex-grow">
              <textarea
                className="w-full focus:outline-none"
                placeholder="Insert Description here"
                defaultValue=""
                ref={register({ required: "true" })}
                name="Description"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.Description?.type == "required" &&
              "Description is required!"}
          </span>
        </div>

        <div className="submit_buttons mx-auto w-full space-x-5 p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a className="w-full p-6 mr-0" href={PATHS.AUTHOR}>Cancel</a>
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

export default NewAuthorPage;
