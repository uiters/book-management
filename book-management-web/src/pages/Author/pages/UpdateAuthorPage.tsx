//@ts-ignore
import { useState, useEffect } from "react";
//@ts-ignore
import { useHistory } from "react-router-dom";
//@ts-ignore
import { useForm } from "react-hook-form";
//@ts-ignore
import { useParams } from "react-router-dom";
import authorApi from "../../../services/api/authorApi";
import { toastSuccess, toastError } from "../../../services/toastService";
import NewAuthorFormData from "../../../types/form/NewAuthorFormData";
import AuthorModelPage from "../../../types/models/AuthorModelPage";
import { PATHS } from "../../../constants/paths";

type idCategory = {
  id: string;
};

const UpdateAuthorPage = () => {

  const history = useHistory();
  const [author, setAuthor] = useState<AuthorModelPage>();
  const { authorId } = useParams();
  const [isLoading, setLoading] = useState<Boolean>(false);

  const getAuthor = () => {
    authorApi
      .getById(authorId)
      .then((response) => {
        console.log(authorId);
        console.log(response.data);
        setAuthor(response.data);
        setLoading(true);
        toastSuccess("Load Author Success!");
      })
      .catch((error) => {
        console.log(error);
        toastError("Load Author failed!");
      });
  };

  useEffect(() => {
    getAuthor();
  }, []);

  const onSubmit = (formData: NewAuthorFormData) => {
    console.log(formData);
    authorApi
      .updateAuthor(authorId, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess("Update  author success!");
          history.push("/author");
        }
      })
      .catch((errors) => {
        toastError("Update author failed");
      });
  };

  const { register, handleSubmit, errors } = useForm<NewAuthorFormData>({
    mode: "onChange",
    revalidateModel: "onChange",
    // defaultValues: {
    //     "Name": author?.name,
    //     "Description": category?.details
    // }
  });

  if (isLoading === false) {
    return <div></div>;
  }

  return (


    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">Update Author Page</h1>
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
                defaultValue={author.name}
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
            Descriptions:
            </label>
          <div className="w-full border">
            <span className="flex-grow">
              <textarea
                className="w-full focus:outline-none"
                placeholder="Insert Description here"
                defaultValue={author.description}
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
            className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 px-7 text-white font-bold w-auto"
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  );
}

export default UpdateAuthorPage;