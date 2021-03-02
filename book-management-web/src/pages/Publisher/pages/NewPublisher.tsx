//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { toastError, toastSuccess } from "../../../services/toastService";
import authorApi from "../../../services/api/authorApi";
import NewPublisherFormData from "../../../types/form/NewPublisherFormData";
import publisherApi from "../../../services/api/publisherApi";

const NewPublisher = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm<NewPublisherFormData>({
    mode: "onChange",
  });

  const onSubmit = (formData: NewPublisherFormData) => {
    console.log(formData);

    publisherApi
      .addNewPublisher(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Create new publisher success!");
          history.push("/publisher");
        }
      })
      .catch((errors) => {
        toastError("Create new publisher failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* <div className="text-center font-medium text-xl">
                    something
                </div> */}
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Create Publisher Form
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Name
            </label>
            <input
              ref={register()}
              // style={{borderColor: errors.name ? "red":""}}
              // ref={register()}
              name="Name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {/* {errors.name && "Username is invalid"} */}
          </div>

          <div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPublisher;
