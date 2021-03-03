//@ts-ignore
import React, { useState } from 'react';
//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastError, toastSuccess } from "../../../services/toastService";
import authorApi from "../../../services/api/authorApi";
import NewPublisherFormData from "../../../types/form/NewPublisherFormData";
import publisherApi from "../../../services/api/publisherApi";
import { PATHS } from "../../../constants/paths";

const NewPublisher = () => {
  const history = useHistory();

  const [isLeave, setIsLeave] = useState<Boolean>(false);

  const { register, handleSubmit, errors, reset } = useForm<NewPublisherFormData>({
    mode: "onChange",
    reValidateModel: "onChange"
  });

  

  const onSubmit = (formData: NewPublisherFormData) => {
    console.log(formData);

    publisherApi
      .addNewPublisher(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Create new publisher success!");

          if (isLeave) {
            // history.push(PATHS.BOOK + "/" + res.data);
            history.push("/publisher");
          } else {
            reset();
          }

        }
      })
      .catch((errors) => {
        toastError("Create new publisher failed");
      });
  };

  return (
    // <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
    //   <div className="max-w-md w-full mx-auto">
    //     {/* <div className="text-center font-medium text-xl">
    //                 something
    //             </div> */}
    //     <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
    //       Create Publisher Form
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
    //         <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">New Publisher Page</h1>
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
        <div className="submit_buttons mx-auto w-full space-x-5 p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a className="w-full p-6 mr-0" href={PATHS.PUBLISHER}>Cancel</a>
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

export default NewPublisher;
