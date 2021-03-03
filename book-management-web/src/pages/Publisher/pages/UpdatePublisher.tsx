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
import PublisherModelPage from "../../../types/models/PublisherModelPage";
import publisherApi from "../../../services/api/publisherApi";
import { PATHS } from "../../../constants/paths";

const UpdatePublisher = () => {

    const history = useHistory();
    const [publisher, setPublisher] = useState<PublisherModelPage>();
    const { publisherId } = useParams();
    const [isLoading, setLoading] = useState<Boolean>(false);

    const getPublisher = () => {
        publisherApi
            .getById(publisherId)
            .then((response) => {
                console.log(publisherId);
                console.log(response.data);
                setPublisher(response.data);
                setLoading(true);
                toastSuccess("Load Publisher Success!");
            })
            .catch((error) => {
                console.log(error);
                toastError("Load Publisher failed!");
            });
    };

    useEffect(() => {
        getPublisher();
    }, []);

    const onSubmit = (formData: NewCategoryFormData) => {
        console.log(formData);
        publisherApi
            .updatePublisher(publisherId, formData)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toastSuccess("Update Publisher success!");
                    history.push("/publisher");
                }
            })
            .catch((errors) => {
                toastError("Update Publisher failed");
            });
    };

    const { register, handleSubmit, errors } = useForm<NewCategoryFormData>({
        mode: "onChange",
        revalidateModel: "onChange",

        // defaultValues: {
        //     "Name": category?.name,
        //     "Details": category?.details
        // }
    });

    if (isLoading === false) {
        return <div></div>;
    }

    return (
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
                                defaultValue={publisher.name}
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
                        className="focus:outline-none bg-blue-600 hover:bg-blue-400 rounded-lg p-2 px-7 text-white font-bold w-auto"
                    >
                        Submit
          </button>

                </div>
            </form>
        </div>
    );
}

export default UpdatePublisher;