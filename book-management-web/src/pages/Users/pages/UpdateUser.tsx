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
import { PATHS } from "../../../constants/paths";
import UpdateUsersFormData from "../../../types/form/UpdateUsersFormData";
import usersApi from "../../../services/api/usersApi";

const UpdateUser = () => {

  const history = useHistory();
  const [user, setUser] = useState<UpdateUsersFormData>();
  const { userId } = useParams();
  const [isLoading, setLoading] = useState<Boolean>(false);

  const [role, setRole] = useState("Admin");

  const getUser = () => {
    usersApi
      .getById(userId)
      .then((response) => {
        setUser(response.data);
        console.log(user)
        setLoading(true);
        toastSuccess("Load User Success!");
      })
      .catch((error) => {
        console.log(error);
        toastError("Load User failed!");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = (formData: UpdateUsersFormData) => {
    debugger
    console.log(formData)
    formData.role = role
    usersApi
      .updateUser(userId, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toastSuccess(res.data);
          history.push(PATHS.USERS);
        }
      })
      .catch((errors) => {
        toastError(errors.response.data.message);
      });
  };

  const { register, handleSubmit, errors } = useForm<UpdateUsersFormData>({
    mode: "onChange",
    revalidateModel: "onChange",
    defaultValues: {
    //   "Name": category?.name,
    //   "Details": category?.details
    }
  });

  if (isLoading === false) {
    return <div></div>;
  }

  const handleSelectRole = (e: any) => {

    setRole(e.target.value);
    console.log(e.target.value);

  }

  return (
    <div className="flex flex-col w-full mt-6 items-center bg-white">
      <div className="title">
        <h1 className="font-bold text-xl pt-4">Update User Page</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6 w-full p-5"
      >
        <div className="form-group flex flex-col items-start">
          <label htmlFor="title" className="font-bold text-gray-500 w-full text-left">
            Name: <span className="text-red-700">(*)</span>
          </label>
          <div className="w-full">

            <span className="flex-grow">
              <input
                ref={register({
                  required: true,
                })}
                // style={{ borderColor: errors.name ? "red" : "" }}
                name="name"
                type="text"
                defaultValue={user.name}
                className="w-full p-2 border border-gray-300 rounded mt-1 outline-none"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.name?.type == "required" && "Name is required!"}
          </span>
        </div>
        <div className="form-group flex flex-col items-start">
          <label htmlFor="description" className="font-bold text-gray-500 w-full text-left">
            Username:<span className="text-red-700">(*)</span>
          </label>
          <div className="w-full border">
            <span className="flex-grow">
              <input
                ref={register({
                  required: true,
                })}
                // style={{ borderColor: errors.username ? "red" : "" }}
                name="username"
                type="text"
                disabled={true}
                defaultValue={user.username}
                className="w-full p-2 border-gray-300 rounded mt-1 outline-none"
              />
            </span>
          </div>
          <span className="text-left items-start flex text-red-400">
            {errors.username?.type == "required" &&
              "Username is required!"}
          </span>
        </div>
        <div className="w-full flex flex-grow gap-x-5">
          <div className="form-group flex flex-col items-start w-1/2">
            <label htmlFor="title" className="font-bold text-gray-500 w-full text-left">
              Password:<span className="text-red-700">(*)</span>
            </label>
            <div className="w-full">

              <span className="flex-grow">
                <input
                  ref={register({
                    required: true,
                    pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i
                  })}
                  // style={{ borderColor: errors.password ? "red" : "" }}
                  name="password"
                  type="password"
                  defaultValue={user.password}
                  className="w-full p-2 border border-gray-300 rounded mt-1 outline-none"
                />
              </span>
            </div>
            <span className="text-left items-start flex text-red-400">
              {errors.password?.type == "required" && "Password is required!"}
              {errors.password?.type == "pattern" && "Password is include 1 Uppercase, 1 Lowercase, 1 number and min 8 character!"}
            </span>
          </div>
          <div className="form-group flex flex-col items-start w-1/2">
            <label htmlFor="title" className="font-bold text-gray-500 w-full text-left">
              Email: <span className="text-red-700">(*)</span>
            </label>
            <div className="w-full">

              <span className="flex-grow">
                <input
                  ref={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
                  })}
                  // style={{ borderColor: errors.email ? "red" : "" }}
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="w-full p-2 border border-gray-300 rounded mt-1 outline-none"
                />
              </span>
            </div>
            <span className="text-left items-start flex text-red-400">
              {errors.email?.type == "required" && "Email is required!"}
              {errors.email?.type == "pattern" && "Email is invalid!"}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-grow gap-x-5">
          <div className="form-group flex flex-col items-start w-1/2">
            <label htmlFor="title" className="font-bold text-gray-500 w-full text-left">
              Role:
              </label>
            <div className="w-full">
              <span className="flex-grow">
                <select
                  // ref={register()}
                  onChange={handleSelectRole}
                  className="p-2 w-full outline-none border-2"
                  defaultValue={user.role}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Officer">Officer</option>
                  <option value="User">User</option>
                </select>
              </span>
            </div>
            <span className="text-left items-start flex text-red-400">
              {errors.name?.type == "required" && "Name is required!"}
            </span>
          </div>

          <div className="w-1/2">
            <label htmlFor="" className="font-bold text-gray-500 block text-left">
              Phone <span className="text-red-700">(*)</span>
            </label>
            <input
              ref={register({
                required: true,
                pattern: /^[0-9]+$/i,
                maxLength: "15"
              })}
              name="phone"
              type="text"
              defaultValue={user.phone}
              className="w-full p-2 border border-gray-300 rounded mt-1 outline-none"
            />
            <span className="text-left items-start flex text-red-400">
              {errors.phone?.type == "required" && "Phone is required!"}
              {errors.phone?.type == "pattern" && "Phone just only number!"}
              {errors.phone?.type == "maxLength" && "Phone is max 15 chars!"}
            </span>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="" className="font-bold text-gray-600 block text-left">
            Address <span className="text-red-700">(*)</span>
          </label>
          <input
            ref={register({
              required: true,
            })}
            name="Address"
            type="text"
            defaultValue={user.address}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          <span className="text-left items-start flex text-red-400">
            {errors.Address?.type == "required" && "Address is required!"}
          </span>
        </div>

        <div className="submit_buttons mx-auto w-full space-x-5 p-4">
          <button className="focus:outline-none bg-red-600 hover:bg-red-400 rounded-lg p-2 text-white font-bold w-auto">
            <a className="w-full p-6 mr-0" href={PATHS.USERS}>Cancel</a>
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

export default UpdateUser;