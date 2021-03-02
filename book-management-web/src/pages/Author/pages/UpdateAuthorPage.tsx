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

    const { register, handleSubmit } = useForm<NewAuthorFormData>({
        mode: "onChange",
        // defaultValues: {
        //     "Name": author?.name,
        //     "Description": category?.details
        // }
    });

    if (isLoading === false) {
        return <div></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
                    Update Author Form
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
                            defaultValue={author.name}
                            name="Name"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                        {/* {errors.name && "Username is invalid"} */}
                    </div>

                    <div>
                        <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                            Description
            </label>
                        <input
                            ref={register({ required: true })}
                            defaultValue={author.description}
                            name="Description"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
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
}

export default UpdateAuthorPage;